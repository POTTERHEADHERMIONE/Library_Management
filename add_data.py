#run this code to add stuff into your database
#sudo systemctl start mongod
import database 
import random

# adding 30 books into database
def add_new_books():

 database.add_new_book(isbn="9788184959895" , title="Little Black Book For Stunning Success" , author="Robin Sharma" , count=5 ,ebook_link='https://drive.google.com/file/d/16fxaAXvPm3DJy9nNZ4ZHmWHaD5kMeQQk/view')
 database.add_new_book(isbn="9781512181074" , title="Your Mind and How to Use It: A Manual of Practical Psychology" , author="William Walker Atkinson" , count=2 ,ebook_link='https://drive.google.com/file/d/1PEhc3eCBOtw7ZyHE5R7tw3CapWo5EJiF/view')
 database.add_new_book(isbn="9781585428748" , title="The Kybalion: The Definitive Edition" ,author="William Walker Atkinson" , count=8,ebook_link='https://drive.google.com/file/d/1g6OffT0l9WMYS2S8fg91CgCkXt-K0m2A/view')
 database.add_new_book(isbn="9798745738050" , title="The Science of Being Well" , author=" Wattles, Wallace D." , count=9,ebook_link='https://drive.google.com/file/d/1FVIHGAxgDnzVuYCB1Lc_rx81f8AkQqN6/view')
 database.add_new_book(isbn="9780557255764" , title="What Matters Now" , author="Godin Seth" , count=10 ,ebook_link='https://drive.google.com/file/d/1OevkiOfF6PfG1QPLk8hybY7iqreQDSH-/view')
 database.add_new_book(isbn="9798463489029" , title="As a man Thinketh" , author="James Allen" , count=10,ebook_link='https://drive.google.com/file/d/1LJ2x4FcVkl7rdJlK3AiTEOT1Rf3_E3yh/view')
 database.add_new_book(isbn="9789358596663" , title="The Psychology Of Salesmanship" , author="Willliam Walker Atkinson" , count=11,ebook_link='https://drive.google.com/file/d/1ar0EqbNUBM6x1L99fe0f_6T-xl8-sKOo/view')
 database.add_new_book(isbn="9780787988692" , title="Leading from within: Building Organizational Leadership Capacity" , author="David R. Kolzow" , count=1,ebook_link='https://drive.google.com/file/d/17OnTyTqpQ6gBNHGpCHF79znYrL1xraov/view')
 database.add_new_book(isbn="9780142408766" , title="Little Woman" , author="Louisa May Alcott" , count=15,ebook_link='https://drive.google.com/file/d/17mf6e9E-VeP4t1xUVuGdwhVVWlKqMf7K/view')
 database.add_new_book(isbn="9781853260407" , title="The Three Musketeers" , author="Alexandre Dumas" , count=5,ebook_link='https://drive.google.com/file/d/1fh9Er7nROSi7Szy5nDvfp9UECuaspMrK/view')
 database.add_new_book(isbn="9780451530578" , title="A Tale of Two Cities" , author="Charles Dickens" , count=10,ebook_link='https://drive.google.com/file/d/1tUxLdQK36dU-ISClxnNl1CDIUYUf5qn8/view')
 database.add_new_book(isbn="9781547200078" , title="The Adventures of Sherlock Homes" , author="Arthur Conan Doyle" , count=2,ebook_link='https://drive.google.com/file/d/1Bagi3u_xrvPAdNfeSd3WEcH7gU7Du-Iq/view')
 database.add_new_book(isbn="9781462112579" , title="Happiness is a habit" , author="Kris Heap" ,count=7,ebook_link='https://drive.google.com/file/d/18HxzSxE2IS0AhALqV2nER7IvFowspygi/view')
 database.add_new_book(isbn="9781950435364" , title="Journey to the Center of the Earth" , author="Jules Verne" , count=15,ebook_link='https://drive.google.com/file/d/1HH0tli3I9Bs5y300Q4B615fq7VR9g0mj/view')
 database.add_new_book(isbn="9781591940715" , title="The Mark of Zorro" , author="Johnston McCulley" , count=7,ebook_link='https://drive.google.com/file/d/1nrUXJ8XIPBpFqtlsTipX4emYRqph9n7a/view')
 database.add_new_book(isbn="9780451529619" , title="Swiss Family Robinson" , author="Johann David Wyss" , count=8,ebook_link='https://drive.google.com/file/d/1BSEwEMCWLOVaPJU9CetRGTV2SQpdy63R/view')
 database.add_new_book(isbn="9781853260315" , title="Twenty Thousand Leagues Under the Sea" , author="Jules Verne" ,count=23,ebook_link='https://drive.google.com/file/d/15AzQQ5yBb3ADcbQcHGFz5WHr4uV6UVxe/view')
 database.add_new_book(isbn="9798373456562" , title="Robinson Crusoe" , author="Daniel Defoe" , count=15,ebook_link='https://drive.google.com/file/d/1eF4UnoJgEGNiRVj-TxANNEEgtFTR0HpA/view')
 database.add_new_book(isbn="9798859434930" , title="Treasure Island" , author="Robert Louis Stevenson" , count=2,ebook_link='https://drive.google.com/file/d/1UIZXUKorbGtWdxhrWmKOqwOTJSbe3VkM/view')
 database.add_new_book(isbn="9781853260087" , title="Moby Dick" , author="Herman Melville" , count=8,ebook_link='https://drive.google.com/file/d/1c6iMaQ1vU6gyp0AXrdBfmUu54MUMl13k/view')

#adding 30 users 
def add_students():

    database.add_user(id="1", password="password123", name="John Doe")
    database.add_user(id="2", password="securePwd456", name="Alice Smith")
    database.add_user(id="3", password="secretPass", name="Ella Johnson")
    database.add_user(id="4", password="userPass789", name="Michael Wilson")
    database.add_user(id="5", password="p@ssw0rd", name="Olivia Davis")
    database.add_user(id="6", password="realPassword", name="James Brown")
    database.add_user(id="7", password="P@ssw0rd!", name="Sophia White")
    database.add_user(id="8", password="12345678", name="Emma Martin")
    database.add_user(id="9", password="password1234", name="William Lee")
    database.add_user(id="10", password="secure123!", name="Grace Hall")
    database.add_user(id="11", password="realPwd567", name="Daniel Turner")
    database.add_user(id="12", password="P@ssw0rd345", name="Lily Clark")
    database.add_user(id="13", password="userpass", name="Logan Baker")
    database.add_user(id="14", password="p@ssword456", name="Sophia Wilson")
    database.add_user(id="15", password="securepwd789", name="Benjamin Anderson")
    database.add_user(id="16", password="123456", name="Olivia Scott")
    database.add_user(id="17", password="pwd123", name="Henry Wright")
    database.add_user(id="18", password="realuser", name="Chloe Young")
    database.add_user(id="19", password="password01", name="Mason King")
    database.add_user(id="20", password="p@ssw0rd99", name="Abigail Hill")
    # database.add_user("21", "pass123", "Ethan Moore")
    # database.add_user("22", "securepass", "Emily Brown")
    # database.add_user("23", "user123", "Liam Harris")
    # database.add_user("24", "P@ssword99", "Ava Mitchell")
    # database.add_user("25", "realPwd123", "Noah Turner")
    # database.add_user("26", "secureP@ss", "Sofia Turner")
    # database.add_user("27", "password567", "Lucas Parker")
    # database.add_user("28", "1234pass", "Amelia Bell")
    # database.add_user("29", "pwd999", "William Foster")
    # database.add_user("30", "p@ssw0rd123", "Mia Carter")

#Adding 1 admin
def add_admin():
    database.add_user(id="307",password="SPA",name="Saakshi",is_admin=1)
# database.addUser()

def issue_books():
    for _ in range(50):
        isbn = list(database.book_list.find())[random.randint(0,19)]['isbn']
        id = str(random.randint(1,20))
        database.issue_book(isbn=isbn,id=id)

# def add_penalty():
#     database.studentList.update_many({},{'books': books[]})

if __name__ == '__main__':
    # add_students()
    add_admin()
    # issue_books() 
    # add_new_books()
    # pass