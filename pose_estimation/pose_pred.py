import cv2
from ultralytics import YOLO
from funcs import findAngle

repCount = 0 
direction = 0 # 0 is down 1 is up
bottom = 0 # 0 is false 1 is true
frameCount = 0
accum_conf_left = 0
accum_conf_right = 0

# TODO test for longer frames?? to be more precise
# Load a model
model = YOLO('yolov8l-pose.pt')  
video_path = "./pushup_flipped.mp4"

cap = cv2.VideoCapture(video_path) # create capture obj
fps = cap.get(cv2.CAP_PROP_FPS) # float 'fps'
fw  = cap.get(cv2.CAP_PROP_FRAME_WIDTH)   # float `width`
fh = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)  # float `height`
print(fw,fh,fps)
output_name = f"{video_path.split('/')[-1].split('.')[0]}"
out = cv2.VideoWriter(f"{output_name}_kpt.mp4",cv2.VideoWriter_fourcc('m','p','4','v'),fps,(int(fw),int(fh))) # create writer obj


while cap.isOpened():
    ret, frame = cap.read()
 
    if ret == True: 
        output = model(frame) # pass frame through model
        keypts = output[0].keypoints[0].cpu().detach().numpy() # get keypoints from tensor

        angle_left,conf_left = findAngle(frame, keypts, 5,7,9,draw=True) # draw limb for left arm and calc angle
        angle_right,conf_right = findAngle(frame, keypts, 6,8,10,draw=True) # draw limb for right arm and calc angle

        print(f"Left angle:{angle_left} (conf:{conf_left})")
        print(f"Right angle:{angle_right} (conf:{conf_right})")


        if frameCount < round(fps * 0.5): # for first 0.5s calibrate confidence on which side
            accum_conf_left += conf_left
            accum_conf_right += conf_right


        #logical flow for pushup counter
        if accum_conf_right > accum_conf_left: # use more confident side to check
            if angle_right < 85:
                bottom = 1
            if angle_right > 150:
                bottom = 0    
            if bottom:
                if direction == 0:
                    direction = 1
            if not bottom:
                if direction == 1:
                    direction = 0
                    repCount += 1
        else:
            if angle_left < 85:
                bottom = 1
            if angle_left > 150:
                bottom = 0    
            if bottom:
                if direction == 0:
                    direction = 1
            if not bottom:
                if direction == 1:
                    direction = 0
                    repCount += 1
        

        # draw text 
        font                   = cv2.FONT_HERSHEY_SIMPLEX
        bottomLeftCornerOfText = (80,80)
        fontScale              = 3
        fontColor              = (255,255,255)
        thickness              = 3
        lineType               = 2

        cv2.putText(frame,str(repCount), 
            bottomLeftCornerOfText, 
            font, 
            fontScale,
            fontColor,
            thickness,
            lineType)
        

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
if accum_conf_right > accum_conf_left:
    print("right chosen")
else:
    print("left chosen")
# When everything done, release the video capture and video write objects
cap.release()
out.release()
 
# Closes all the frames

cv2.destroyAllWindows()
