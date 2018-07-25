"""
将城市分隔为多个矩形
xmin=112.9758453369, ymin=23.1359401054, xmax=117.1032714844, ymax=24.1617902576
分别代表需要分割的城市矩形左上和右下两个点的坐标.
输出在当前脚本文件的相同目录下，分割好的数据也是矩形的左上和右下两个点的坐标.

"""
import requests, sys
import os;
import time
import json


# 矩形框
class Rect:
    def __init__(self, xmin, ymin, xmax, ymax):
        self.xmin = xmin;
        self.ymin = ymin;
        self.xmax = xmax;
        self.ymax = ymax;


class Cut:
    def __init__(self):
        self.filePath = "123.txt";
        # self.Url="http://restapi.amap.com/v3/place/polygon?polygon=108.640287,26.043184;110.579374,27.275355&key=dc44a8ec8db3f9ac82344f9aa536e678&extensions=all&offset=5&page=1";
        self.Url = "http://restapi.amap.com/v3/place/polygon?polygon=";

    # 切分地块
    def CutChina(self, rect):
        url = self.Url;
        url = self.Url + str(rect.xmin) + "," + str(rect.ymin) + "," + str(rect.xmax) + "," + str(
            rect.ymax) + "&key=c5304f29d1a11f14c4fb29854a831ef0&type='060100'|'060400'&extensions=all&offset=5&page=1"
        print(url);
        data = self.DownHtml(url=url);
        jsonData = json.loads(data)
        count = int(jsonData["count"])
        print(count);
        if count < 900:
            file = open(self.filePath, "a")
            file.writelines(str(rect.xmin) + "," + str(rect.ymin) + "," + str(rect.xmax) + "," + str(rect.ymax) + "\n");
            file.close();
            print("写入数据");
        else:
            middleX = (rect.xmin + rect.xmax) / 2;
            middleY = (rect.ymin + rect.ymax) / 2;
            rect1 = Rect(xmin=rect.xmin, ymin=rect.ymin, xmax=middleX, ymax=middleY);
            rect2 = Rect(xmin=middleX, ymin=rect.ymin, xmax=rect.xmax, ymax=middleY);
            rect3 = Rect(xmin=rect.xmin, ymin=middleY, xmax=middleX, ymax=rect.ymax);
            rect4 = Rect(xmin=middleX, ymin=middleY, xmax=rect.xmax, ymax=rect.ymax);
            # 使用递归调用
            time.sleep(1)  # 休眠1秒
            self.CutChina(rect=rect1);
            time.sleep(1)  # 休眠1秒
            self.CutChina(rect=rect2);
            time.sleep(1)  # 休眠1秒
            self.CutChina(rect=rect3);
            time.sleep(1)  # 休眠1秒
            self.CutChina(rect=rect4);

    # 下载数据
    def DownHtml(self, url):
        request = requests.get(url=url, timeout=(5, 27));
        html = request.text;
        request.close();
        return html;


if __name__ == "__main__":
    cut = Cut();
    # 开始先创建矩形存储文件
    file = open(cut.filePath, "w+");
    file.writelines("xmin,ymin,xmax,ymax\n");
    file.close();
    # 开始分割区域，可以去网站找经纬度 http://www.gpsspg.com/maps.htm

    rect = Rect(xmin=112.9758453369, ymin=23.1359401054, xmax=117.1032714844, ymax=24.1617902576);
    cut.CutChina(rect);
    print("程序完成结束")

