# CS Intel workshop

NodeJS on current Linux image from http://www.intel-software-academic-program.com/pages/courses is way too old so it has to be updated.

Fastest and easiest way is to download latest image for Galileo from https://software.intel.com/en-us/iot/downloads

..or..

Build whole Yocto image by yourself (slow and bumpy road but teaches quite a lot)
- If you are running newer Ubuntu than 12.04, install VirtualBox and Ubuntu 12.04
- In Ubuntu 12.04 download BSP Quark sources from https://downloadcenter.intel.com/Detail_Desc.aspx?DwnldID=23197
- Follow instructions from https://communities.intel.com/thread/48416 and https://github.com/alext-mkrs/meta-alext-galileo to build a package to be installed in galileo

## After getting Galileo up and running

ssh to Galileo remember to set system date on startup, otherwise there will be problems for example with npm.

Install node modules
- galileo-io
- johnny-five
- plotly

##  Arduino:

Sketches use http://arduino.cc/playground/Main/RunningMedian
