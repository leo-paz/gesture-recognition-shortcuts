import json
import sys
import os

from PIL import Image, ImageDraw
import numpy as np
import base64
import boto3
import io
import pickle
import torch 
from io import BytesIO

import logging

from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.data import MetadataCatalog
from detectron2.utils.visualizer import ColorMode, Visualizer
import cv2
import requests
import numpy as np
from detectron2 import model_zoo

def predict(event, context):
    logger = logging.getLogger()

    logger.info("Received event: " + json.dumps(event, indent=2))
    logger.info("Received body: " + event['body'])
    print(event['body'])
    imageString = event['body']
    
    base64_decoded = base64.b64decode(imageString.split(',')[1])

    im_arr = np.frombuffer(base64_decoded, dtype=np.uint8)  # im_arr is one-dim Numpy array
    image = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    print("IMAGE SHAPE")
    print(image.shape)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    print("GRAY IMAGE SHAPE SHAPE")
    print(gray.shape)

    height, width, c = image.shape

    print("Before graying")
    print(image.item((100, 100, 0)))

    for x in range(width):
      for y in range(height):
        b = image.item(y, x, 0)
        g = image.item(y, x, 1)
        r = image.item(y, x, 2)
        sum = (0.11 * b) + (0.59 * g) + (0.3 * r)
        b = image.itemset((y, x, 0), sum)
        g = image.itemset((y, x, 1), sum)
        r = image.itemset((y, x, 2), sum)
        
    print("After graying")
    print(image.item((100, 100, 0)))
    # image_response = GSVFetching.ImageFetching.getGSVImage(event['queryStringParameters'])
    # image_as_np_array = np.frombuffer(image_response[0], np.uint8)
    # image = cv2.imdecode(image_as_np_array, cv2.IMREAD_COLOR)

    logger.info("decoded gsv image")

    # image_reponse = requests.get("https://upload.wikimedia.org/wikipedia/commons/4/41/Leo_Messi_v_Almeria_020314_%28cropped%29.jpg")
    # image_as_np_array = np.frombuffer(image_reponse.content, np.uint8)
    # image = cv2.imdecode(image_as_np_array, cv2.IMREAD_COLOR)

    cfg = get_cfg()
    cfg.merge_from_file(model_zoo.get_config_file("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml"))
    cfg.MODEL.ROI_HEADS.NUM_CLASSES = 5
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.45  # set threshold for this model
    cfg.MODEL.WEIGHTS = "../model_final.pth"
    cfg.MODEL.DEVICE = "cpu" # we use a CPU Detectron copy
    classes = MetadataCatalog.get("gestures_train").thing_classes = ["palm", 
                                                                  "l",
                                                                  "first",
                                                                  "fist_moved",
                                                                  "thumb",
                                                                  "index",
                                                                  "ok",
                                                                  "palm_moved",
                                                                  "c",
                                                                  "down"]

    predictor = DefaultPredictor(cfg)
    logger.info("Predictor has been initialized.")

    scoring_result = predictor(image)

    instances = scoring_result["instances"]
    scores = instances.get_fields()["scores"].tolist()
    pred_classes = instances.get_fields()["pred_classes"].tolist()
    pred_boxes = instances.get_fields()["pred_boxes"].tensor.tolist()

    v = Visualizer(image[:, :, ::-1],
        MetadataCatalog.get("gestures_train"),
        scale=0.5, 
        instance_mode=ColorMode.IMAGE_BW   # remove the colors of unsegmented pixels. This option is only available for segmentation models
      )
    logger.info('drew on image')

    out = v.draw_instance_predictions(scoring_result["instances"].to("cpu"))

    im = Image.fromarray(np.uint8(out.get_image()[:, :, ::-1]))
    r, g, b = im.split()
    rgb = [b, r, g]
    im = Image.merge("RGB", (b, g, r))

    buffered = io.BytesIO()
    im.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode('ascii')
    logger.info('created image string')

    instances = scoring_result["instances"]
    scores = instances.get_fields()["scores"].tolist()
    pred_classes = instances.get_fields()["pred_classes"].tolist()
    pred_boxes = instances.get_fields()["pred_boxes"].tensor.tolist()

    newClasses = []

    for i in range(len(pred_classes)):
        print(scores[i])
        print(classes[pred_classes[i]])
        newClasses.append(classes[pred_classes[i]])

    predictedStrings = ','.join(newClasses);

    response = {
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,x-custom-message',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials" : True,
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        },
        'statusCode': 200,
        'body': json.dumps({
            "classes": predictedStrings
        })
    }

    return response

if __name__ == "__main__":
    goodbye('', '')