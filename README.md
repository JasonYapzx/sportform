# SportForm

# Pose Estimation

SportForm uses state of the art object detection and pose estimation model to generate 17 key points including left and right shoulders to ankles.

We utilise the YOLOv8l-pose model from [ultralytics](https://github.com/ultralytics/ultralytics) which is accurate yet fast.

We then pass the video uploads from our users through the model and generate the location of the keypoints. These keypoints are used to calculate different angles and distances to determine the number of repitions and the form of different exercises.

In the future, there could be a possiblity to train deep neural networks for specific exercises to determine the number of repitions and the form. However, as of right now it is out of our scope as consumes too much time and resources.

## Installation

The implementation of our pose estimation scripts are in a Python>=3.7 environment with PyTorch>=1.7.

Please do install CUDA enabled [PyTorch](https://pytorch.org/get-started/locally/) where applicable to speed up the inference.

For the other requirements, refere to [YOLOv8 documentaion](https://github.com/ultralytics/ultralytics) by ultralytics

`pip install ultralytics`

## Usage

### CLI

Our script to generate video with annotations can be used from the Command Line Interface (CLI).

First enter the directory `/path/to/sportform/pose_estimation` using

`cd /path/to/sportform/pose_estimation`

You can try our example video generation for pushups using:

`python3 pushup_keypts.py -s=./pushup.mp4`

and for situps using:

`python3 situp_keypts.py -s=./situp.mp4`
