import cv2
from ultralytics import YOLO
from funcs import findAngle
import argparse

# arg parser
parser = argparse.ArgumentParser(description='Input: 16/9 horizontal video of pushups // Output: video of pushup with keypts')
parser.add_argument("-s","--source", help="video input path", type=str,required=True)
args = parser.parse_args()


repCount = 0 
direction = 0 # 0 is pos direction (down), 1 is neg direction (up)
middle = 0 # middle of rep (0 is false 1 is true)
good_form = 0 # 0 is not good form, 1 is good form
frameCount = 0
accum_conf_left_arm = 0
accum_conf_right_arm = 0
accum_conf_left_back = 0
accum_conf_right_back = 0


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

        angle_left_arm,conf_left_arm = findAngle(frame, keypts, 5,7,9,'left',draw=True) # draw limb for left arm and calc angle
        angle_right_arm,conf_right_arm = findAngle(frame, keypts, 6,8,10,'right',draw=True) # draw limb for right arm and calc angle
        # print(f"Left arm angle:{angle_left_arm} (conf:{conf_left_arm})")
        # print(f"Right arm angle:{angle_right_arm} (conf:{conf_right_arm})")

        angle_left_back,conf_left_back = findAngle(frame, keypts, 5,11,13,'left',draw=True) # draw limb for left arm and calc angle
        angle_right_back,conf_right_back = findAngle(frame, keypts, 6,12,14,'right',draw=True) # draw limb for right arm and calc angle
        angle_ave_back = (angle_right_back + angle_left_back)/2 
        # print(f"Left back angle:{angle_left_back} (conf:{conf_left_back})")
        # print(f"Right back angle:{angle_right_back} (conf:{conf_right_back})")


        if frameCount < round(fps * 0.5): # for first 0.5s calibrate confidence on which side
            accum_conf_left_arm += conf_left_arm
            accum_conf_right_arm += conf_right_arm

        #logical flow for straight back detector
        if angle_ave_back > 200 or angle_ave_back < 160:
            good_form = 0
        else:
            good_form = 1

        #logical flow for pushup counter
        if accum_conf_right_arm > accum_conf_left_arm: # use more confident side to check
            angle_arm = angle_right_arm
        else:
            angle_arm = angle_left_arm

        if angle_arm < 85 and good_form:
            middle = 1
        if angle_arm > 150:
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
        
        if good_form == 0: # draw straighten back warning
            cv2.rectangle(frame,(70,660),(600,720), # draw warning bg
            (94,74,223),
            -1)

            cv2.putText(frame,'Straighten Back', # draw warning
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
