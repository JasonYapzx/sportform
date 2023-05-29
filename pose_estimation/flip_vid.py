import cv2
from ultralytics import YOLO
from funcs import findAngle
import argparse

# arg parser
parser = argparse.ArgumentParser(description='Input: 16/9 horizontal video of pushups // Output: video of pushup with keypts')
parser.add_argument("-s","--source", help="video input path", type=str,required=True)
args = parser.parse_args()

repCount = 0 
direction = 0 # 0 is down 1 is up
bottom = 0 # 0 is false 1 is true

# Load a model
model = YOLO('yolov8l-pose.pt')  
video_path = args.source

cap = cv2.VideoCapture(video_path) # create capture obj
fps = cap.get(cv2.CAP_PROP_FPS) # float 'fps'
fw  = cap.get(cv2.CAP_PROP_FRAME_WIDTH)   # float `width`
fh = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)  # float `height`
print(fw,fh,fps)
output_name = f"{video_path.split('/')[-1].split('.')[0]}"
out = cv2.VideoWriter(f"{output_name}_flipped.mp4",cv2.VideoWriter_fourcc('m','p','4','v'),fps,(int(fw),int(fh))) # create writer obj

while cap.isOpened():
    ret, frame = cap.read()
    if ret == True: 
        frame = cv2.flip(frame, 1)
        
        # Write the frame into the file 'output.avi' 
        out.write(frame)
    
        # Display the resulting frame    
        cv2.imshow('frame',frame)
    
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
