import math
import cv2

def findAngle(img, keypts, p1,p2,p3, draw=True):
    coord = []
    no_keypts = len(keypts)
    for i in range(no_keypts):
        cx,cy  = keypts[i][0], keypts[i][1]
        conf = keypts[i][2]
        coord.append([cx,cy,conf])
    
    points = (p1,p2,p3)
    x1,y1,conf1 = coord[p1][0:3]
    x2,y2,conf2 = coord[p2][0:3]
    x3,y3,conf3 = coord[p3][0:3]

    ave_conf= (conf1 + conf2 + conf3)/3

    angle = math.degrees(math.atan2(y3-y2,x3-x2) - math.atan2(y1-y2,x1-x2))

    if angle < 0:
        angle += 360
    if angle > 180:
        angle = -1*(angle-360)

    if draw:
        cv2.line(img,(int(x1),int(y1)),(int(x2),int(y2)), (255,255,255) , 3)
        cv2.line(img,(int(x2),int(y2)),(int(x3),int(y3)), (255,255,255) , 3)
        cv2.circle(img, (int(x1),int(y1)), 10, (255,255,255), cv2.FILLED)
        cv2.circle(img, (int(x2),int(y2)), 10, (255,255,255), cv2.FILLED)
        cv2.circle(img, (int(x3),int(y3)), 10, (255,255,255), cv2.FILLED)

    return int(angle),ave_conf