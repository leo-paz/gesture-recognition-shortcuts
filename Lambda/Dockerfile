FROM public.ecr.aws/lambda/python:3.8

RUN yum update -y

# gcc compiler and opencv prerequisites
RUN yum -y install nano git build-essential libglib2.0-0 libsm6 libxext6 libxrender-dev gcc

RUN yum -y install mesa-libGL
# Detectron2 prerequisites
RUN pip install torch==1.7.1+cpu torchvision==0.8.2+cpu -f https://download.pytorch.org/whl/torch_stable.html
RUN pip install cython
RUN pip install -U 'git+https://github.com/cocodataset/cocoapi.git#subdirectory=PythonAPI'
RUN pip install google_streetview
# Detectron2 - CPU copy
RUN python -m pip install detectron2 -f https://dl.fbaipublicfiles.com/detectron2/wheels/cpu/torch1.7/index.html

# Development packages
RUN pip install requests opencv-python

COPY handler.py handler.py
COPY ./model_final.pth ../model_final.pth
CMD ["handler.predict"]