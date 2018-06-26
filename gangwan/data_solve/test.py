
l = [1,2,3,4]
l.reverse()
#print(l)


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
        one_coord.append(float(s.split(',')[0]))
        one_coord.append(float(s.split(',')[1]))
        res_ls.append(one_coord)

    direct_target_coord_ = direct_target_coord_[1:-1]

    arr = direct_target_coord_.split("),(")
    for s in arr:
        one_coord = []
        one_coord.append(float(s.split(',')[0]))
        one_coord.append(float(s.split(',')[1]))
        target_ls.append(one_coord)

    target_ls.reverse()
    res_ls.extend(target_ls)
    return res_ls

res = solve_coord('(113.606594,22.320784),(113.607915,22.321369),(113.608787,22.322042)', '(113.609648,22.321294),(113.608787,22.322042)')
print(res)



def bijiao_():
    print('B' < 'C')
#bijiao_()


def bijiao2(direct_src, direct_target):

    if direct_src < direct_target:
        print(direct_src + "1" + direct_target + "1")
    else:
        print(direct_src + "2" + direct_target + "2")

#bijiao2('B', 'D')


def test_try_exception():
    try:
        i = 100 / 0
    except BaseException as e:
        print(e)
    else:
        print('没有错')

#test_try_exception()


def check_str_is_null():
    a = ''
    print(a is None or a is '')

check_str_is_null()