


def solution(string, key):
    def filter_string(char):
        return char != key

    new_list = filter(filter_string,list(string))
    return "".join(new_list)




print(solution("abx","b"))