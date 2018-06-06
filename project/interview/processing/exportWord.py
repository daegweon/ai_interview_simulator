##################################
# 1. 파일명: exportWord.py
# 2. 저자 : Human Learning
# 3. 목적 : 사용자의 답변 내용으로부터 사용된 단어 추출
# 4. 참조 : KoNLPy 사용, https://m.blog.naver.com/rjs5730/220981013264 참조
# 5. 제한(restriction) : Java, KoNLPy, JPype 설치 필요
##################################

from konlpy.tag import Twitter
from collections import Counter
 
def get_tags(text, ntags=50):
    spliter = Twitter()
    # konlpy의 Twitter Object
    nouns = spliter.nouns(text)
    # nouns 함수를 통해서 text에서 명사만 분리/추출
    count = Counter(nouns)
    # Counter객체를 생성하고 참조변수 nouns할당
    return_list = []
    for n, c in count.most_common(ntags):
        temp = {'tag': n, 'count': c}
        return_list.append(temp)
    # most_common 메소드는 정수를 입력받아 객체 안의 명사중 빈도수
    # 큰 명사부터 순서대로 입력받은 정수 갯수만큼 저장되어있는 객체 반환
    # 명사와 사용된 갯수를 return_list에 저장합니다.
    return return_list