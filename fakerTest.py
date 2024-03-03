from faker import Faker
import random

# Faker 객체 생성, 기본적으로 영어로 설정됩니다.
fake = Faker('ko_KR')

listObj = []

for _ in range(1):
    profile = {}
    profile["name"] = fake.name()
    profile["date"] = fake.date('%Y.%m.%d')
    profile["bothify"] = fake.bothify(text='Product Number: ######-########')
    # profile["address"] = fake.address()
    # profile["job"] = fake.job()
    # profile["email"] = fake.email()
    # profile["ssn"] = fake.ssn()
    # profile["phone_number"] = fake.phone_number()
    # profile["company"] = fake.company()
    # profile["url"] = fake.url()
    # profile["ipv4"] = fake.ipv4()
    # profile["ipv6"] = fake.ipv6()
    # profile["user_agent"] = fake.user_agent()
    # profile["hex_color"] = fake.hex_color()
    # profile["rgb_color"] = fake.rgb_color()
    # profile["safe_hex_color"] = fake.safe_hex_color()
    # profile["safe_color_name"] = fake.safe_color_name()
    listObj.append(profile)
print(listObj)

numb = '010-'+str(random.randint(1, 9999)).zfill(4)+'-'+str(random.randint(1, 9999)).zfill(4)
print(numb)

# 한국어 이름
# profile = {}
# profile["name"] = fake.name()
# profile["address"] = fake.address()
# profile["job"] = fake.job()
# profile["email"] = fake.email()
# profile["ssn"] = fake.ssn()
# profile["phone_number"] = fake.phone_number()
# profile["company"] = fake.company()
# profile["url"] = fake.url()
# profile["ipv4"] = fake.ipv4()
# profile["ipv6"] = fake.ipv6()
# profile["user_agent"] = fake.user_agent()
# profile["hex_color"] = fake.hex_color()
# profile["rgb_color"] = fake.rgb_color()
# profile["safe_hex_color"] = fake.safe_hex_color()
# profile["safe_color_name"] = fake.safe_color_name()

# return profile

# print(fake.profile())

