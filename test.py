#ignore this file, this is for backend dev for testing his/her code

import database

def show(collection):
    for document in collection.find({}):
         print(document)

# print(database.addUser("307","Saa@2004","Saakshi"))
# print(database.addUser("58","Password","Dheefuck"))
# database.addNewClass("141", "Video games are fun","Hruthik",35)
# database.addNewClass("140", "Chadivesava anni ?","Tanux",1)


# database.bookList.delete_many({})
# print("Book issued : ",database.takeBook("140","58"))
# print(database.issueBook("141", "307"))
print(database.takeBook("141","58"))
show(database.bookList)
show(database.studentList)
# show(database.adminList)
# for document in database.bookList.find({}):
#     print(document)
# database.issueBook("142","307")
# if (database.studentList.find_one({'id':'307'})):
    # print("TRUE")
