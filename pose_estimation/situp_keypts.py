import cv2
from ultralytics import YOLO
from funcs import findAngle
from funcs import findDist
import argparse

# arg parser
parser = argparse.ArgumentParser(description='Input: 16/9 horizontal video of pushups // Output: video of pushup with keypts')
parser.add_argument("-s","--source", help="video input path", type=str,required=True)
args = parser.parse_args()

repCount = 0 
direction = 0 # 0 is pos direction (down), 1 is neg direction (up)
middle = 0 # middle of rep (0 is false 1 is true)
good_form = 0
frameCount = 0
accum_conf_left_ear = 0
accum_conf_right_ear = 0
accum_conf_left_knee = 0
accum_conf_right_knee = 0


# TODO test for longer frames?? to be more precise
# Load a model
model = YOLO('yolov8l-pose.pt')  
video_path = args.source

cap = cv2.VideoCapture(video_path) # create capture obj
fps = cap.get(cv2.CAP_PROP_FPS) # float 'fps'
fw  = cap.get(cv2.CAP_PROP_FRAME_WIDTH)   # float `width`
fh = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)  # float `height`
print(f"width={fw},height={fh},fps={fps}")
output_name = f"{video_path.split('/')[-1].split('.')[0]}"
out = cv2.VideoWriter(f"{output_name}_kpt.mp4",cv2.VideoWriter_fourcc('m','p','4','v'),fps,(1280,720)) # create writer obj


while cap.isOpened():
    ret, frame = cap.read()
 
    if ret == True: 
        frame = cv2.resize(frame,(1280,720),fx=0,fy=0, interpolation = cv2.INTER_CUBIC)
        output = model(frame) # pass frame through model
        keypts = output[0].keypoints[0].cpu().detach().numpy() # get keypoints from tensor

        angle_left_back,conf_left_back = findAngle(frame, keypts, 5,11,13,'left',draw=True) # draw limb for left arm and calc angle
        angle_right_back,conf_right_back = findAngle(frame, keypts, 6,12,14,'right',draw=True) # draw limb for right arm and calc angle
        angle_ave_back = (angle_left_back + angle_right_back) / 2
        print(f"Left back angle:{angle_left_back} (conf:{conf_left_back})")
        print(f"Right back angle:{angle_right_back} (conf:{conf_right_back})")
        print(f"Ave back angle:{angle_ave_back}")

        # knee distance to elbow dont work too well, stick to angle
        # dist_left_knee, conf_left_knee = findDist(frame,keypts,7,13,'left', draw=True)
        # dist_right_knee, conf_right_knee = findDist(frame,keypts,8,14,'right', draw=True)
        # print(f"Left knee dist:{dist_left_knee} (conf:{conf_left_knee})")
        # print(f"Right knee dist:{dist_right_knee} (conf:{conf_right_knee})")

        dist_left_ear, conf_left_ear = findDist(frame,keypts,3,9,'left', draw=True)
        dist_right_ear, conf_right_ear = findDist(frame,keypts,4,10,'right', draw=True)
        # print(f"Left ear dist:{dist_left_ear} (conf:{conf_left_ear})")
        # print(f"Right ear dist:{dist_right_ear} (conf:{conf_right_ear})")


        if frameCount < round(fps * 0.5): # for first 0.5s calibrate confidence on which side
            accum_conf_left_ear += conf_left_ear
            accum_conf_right_ear += conf_right_ear
            # accum_conf_left_knee += conf_left_knee
            # accum_conf_right_knee += conf_right_knee

        # if accum_conf_right_knee > accum_conf_left_knee:
        #     dist_knee = dist_right_knee
        # else:
        #     dist_knee = dist_left_knee
            
        if accum_conf_right_ear > accum_conf_left_ear:
            dist_ear = dist_right_ear
        else:
            dist_ear = dist_left_ear

        #logical flow for hands at ears detector
        if dist_ear > 200:
            good_form = 0
        else:
            good_form = 1

        #logical flow for situpcounter
        if angle_ave_back < 60 and good_form:
            middle = 1
        if angle_ave_back > 120:
            middle = 0    
        if middle:
            if direction == 0:
                direction = 1
        if not middle:
            if direction == 1:
                direction = 0
                repCount += 1


        # Draw Visuals
        font                   = cv2.FONT_HERSHEY_SIMPLEX
        topLeftOfScreen = (80,80)
        topMiddleOfScreen = (80,710)
        # fontScale              = 3
        fontColor              = (255,255,255)
        rectangleColour = (252, 207,119)
        # thickness              = 3
        # lineType               = 2

        cv2.rectangle(frame,(70,5),(150,85), # draw counter bg
            rectangleColour,
            -1
        )
        cv2.putText(frame,str(repCount), # draw counter
            topLeftOfScreen, 
            font, 
            3,
            fontColor,
            3,
            2)
        
        if good_form == 0: # draw warning
            cv2.rectangle(frame,(70,660),(735,720), # draw warning bg
            (94,74,223),
            -1)

            cv2.putText(frame,'Place hands at ears', # draw warning
                topMiddleOfScreen, 
                font, 
                2,
                fontColor,
                2,
                2)

        
        # Write the frame into the file 'output.avi' 
        out.write(frame)
    
        # Display the resulting frame    
        cv2.imshow('frame',frame)
        frameCount += 1
        # Press Q on keyboard to stop recording
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
 
  # Break the loop
    else:
        break 

# When everything done, release the video capture and video write objects
cap.release()
out.release()
 
# Closes all the frames

cv2.destroyAllWindows()
