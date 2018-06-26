'''
    所属项目：港湾大道
    任务描述：
        读取 <港湾大道.xlsx>和<18个路口人流量数据汇总.xlsx> 数据，解析成JSON格式的数据
        港湾大道.xlsx : 存储港湾大道18个路口点的坐标以及路口各个方向组合的路径
        18个路口人流量数据汇总.xlsx ： 存储各个路口各个方向的周末和工作日人流量数据统计，包括一天的总流量以及一天24小时各时刻的数据统计
'''
import xlrd
import json

crossing_path_file = '港湾大道.xlsx'
crossing_directs_count_file = '18个路口人流量数据汇总.xlsx'


def point_direct_json():
    '''
    获取18各点各个方向的坐标JSON字符串
    :return:
    '''
    data = xlrd.open_workbook(crossing_path_file)
    table = sheet = data.sheets()[1]
    nrows = table.nrows  # 行数
    ncols = table.ncols  # 列数

    point_json = []

    for i in range(1, nrows):
        rowvalues = table.row_values(i)
        name = rowvalues[0]
        point_A = rowvalues[1]
        point_B = rowvalues[3]
        point_C = rowvalues[5]
        point_D = rowvalues[7]
        point_lng = rowvalues[9]
        point_lat = rowvalues[10]

        point_A_name = rowvalues[11]
        point_B_name = rowvalues[12]
        point_C_name = rowvalues[13]
        point_D_name = rowvalues[14]

        one_json = {
            'name' : name,
            'A' :  {
                'linepath' : point_A,
                'namech' : point_A_name
            },
            'B' : {
                'linepath' : point_B,
                'namech': point_B_name
            },
            'C' : {
                'linepath': point_C,
                'namech': point_C_name
            },
            'D' : {
                'linepath': point_D,
                'namech': point_D_name
            },
            'lng' :  point_lng,
            'lat' : point_lat
        }
        point_json.append(one_json)

        #print(name, point_A, point_B, point_C, point_D, point_lng, point_lat)
    return point_json

def read_crossing_count(point_json) :
    '''
    读取人流量数据excel
    获取各个点的各个方向上的人流量数据
    lukou	方向	20180311	20180317	20180318	20180324	均值
    :return:
    '''

    res_json = {}     #最终返回JSON数据集

    data = xlrd.open_workbook(crossing_directs_count_file)
    table_rest_day = sheet = data.sheets()[0]
    table_rest_hours = sheet = data.sheets()[1]
    table_work_day = sheet = data.sheets()[2]
    table_work__hours = sheet = data.sheets()[3]


    #周末day统计
    table_rest_day_nrows = table_rest_day.nrows  # 行数
    table_rest_day_ncols = table_rest_day.ncols  # 列数

    for point in point_json:      #遍历18各路口点
        #point = point_json[ind]
        name = point['name']
        lng = point['lng']
        lat = point['lat']
        point_A = point['A']['linepath']
        point_B = point['B']['linepath']
        point_C = point['C']['linepath']
        point_D = point['D']['linepath']


        one_crossing = {}  #一个路口

        coordinate = {  #中心坐标
            'lng' : lng,
            'lat' : lat
        }
        one_crossing['coordinate'] = coordinate

        crossing_direct = [] #各个方向


        for i in range(1, table_rest_day_nrows):
            rowvalues = table_rest_day.row_values(i)
            l_name = rowvalues[0]
            direct = rowvalues[1]
            count_avg = rowvalues[6]

            if l_name == name :
                one_direction = {}
                #one_direction['name'] = direct
                direct_src = direct[0]
                direct_target = direct[1]
                #if direct_src < direct_target:
                one_direction['name'] = direct_src + "1" + direct_target + "2"
                if direct_src > direct_target:
                    one_direction['nameCh'] = point[direct_src]['namech'] + '-' + point[direct_target]['namech']
                one_direction['nameCh'] = point[direct_src]['namech'] + '-' + point[direct_target]['namech']

                #else:
                    #one_direction['name'] = direct_src + "2" + direct_target + "2"
                direct_src_coord = point[direct_src]['linepath']  #起点坐标
                direct_target_coord_ = point[direct_target]['linepath'] #终点坐标
                #终点坐标进行处理：翻转
                direct_coord = solve_coord(direct_src_coord, direct_target_coord_)
                one_direction['linepath'] = direct_coord


                #当前方向周末的人流量统计
                rest_day_counts = []
                one_rest_day_count = {}
                one_rest_day_count['count'] = count_avg
                one_rest_day_count['dateTime'] = ''


                #统计周末24小时的时刻人流量
                rest_hours_count = read_rest_day_hours_count(name, direct, table_rest_hours)
                one_rest_day_count['hours'] = rest_hours_count

                rest_day_counts.append(one_rest_day_count)
                one_direction['restDay'] = rest_day_counts


                #统计工作日人流量  以及每小时人流量  -- 读取第三个sheet
                work_day_counts = []
                one_work_day_count = read_work_day_count(name, direct, table_work_day, table_work__hours)
                work_day_counts.append(one_work_day_count)
                one_direction['workDay'] = work_day_counts

                crossing_direct.append(one_direction)


        one_crossing['direction'] = crossing_direct
        res_json[name] = one_crossing



    print(res_json)
    res_json = json.dumps(res_json)
    file = open('lukou_data_gangwan.json', 'w')
    file.write(res_json)
    file.close()


def solve_coord(direct_src_coord, direct_target_coord_): #输入  (113.606594,22.320784),(113.607915,22.321369),(113.608787,22.322042) (113.609648,22.321294),(113.608787,22.322042)
    '''
    处理
    :param direct_src_coord: 第一个方向的坐标path
    :param direct_target_coord_: 第二个方向的坐标path
    :return: 返回当前方向的路径坐标 ，格式：[[113.59986678282249,22.346088500269595],[113.59989791250582,22.345958957436313]]
    '''
    # (113.606594,22.320784),(113.607915,22.321369),(113.608787,22.322042)
    res_ls = []

    target_ls = []
    direct_src_coord = direct_src_coord[1:-1]

    arr = direct_src_coord.split("),(")
    for s in arr:
        one_coord = []
        if s is None or s is '':
            print('s为空')
        else:
            one_coord.append(float(s.split(',')[0]))
            one_coord.append(float(s.split(',')[1]))
            res_ls.append(one_coord)

    direct_target_coord_ = direct_target_coord_[1:-1]

    arr = direct_target_coord_.split("),(")
    for s in arr:
        one_coord = []
        if s is None or s is '':
            print('s为空')
        else:
            s_arr = s.split(',')
            lng = s_arr[0]
            lat = s_arr[1]
            one_coord.append(float(lng))
            one_coord.append(float(lat))
            target_ls.append(one_coord)


    target_ls.reverse()
    res_ls.extend(target_ls)
    return res_ls

def read_work_day_count(name, direct, table_work_day, table_work__hours):
    '''
    读取工作日的人流量数据
    :param name: 当前路口名，
    :param direct: 当前方向
    :param table_work_day: 被统计的sheet表
    :param table_work__hours: 被统计的sheet表  --每小时人流量数据
    :return:
    '''

    #print(name, direct, table_work_day)
    nrows = table_work_day.nrows  # 行数
    ncols = table_work_day.ncols  # 列数

    res_json = {}

    for i in range(1, nrows) :
        row_values = table_work_day.row_values(i)
        if row_values[0] == name and row_values[1] == direct:
            res_json['count'] = row_values[12]
            res_json['dateTime'] = ''
            res_json['hours'] = read_rest_day_hours_count(name, direct, table_work__hours)
            #print(row_values[12])

    return res_json




def read_rest_day_hours_count(name, direct, table_rest_hours) :
    '''
    读取第二个excel。组装各个小时的人流量数据
    :param name: 读取的路口名称
    :param direct: 路口的方向
    :param table_rest_hours:  各个路口各个方向的每小时人流数据汇总sheet表
    :return:
    '''
    #print(name, direct, table_rest_hours)
    nrows = table_rest_hours.nrows  # 行数
    ncols = table_rest_hours.ncols  # 列数

    ret_list = []

    for i in range(1, nrows) :
        row_values = table_rest_hours.row_values(i)
        if row_values[0] == name and row_values[1] == direct:
            for col in range(2, len(row_values)) :
                ret_list.append(row_values[col])


    return ret_list


point_json = point_direct_json()
#print(point_json)
read_crossing_count(point_json)