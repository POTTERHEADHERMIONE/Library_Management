# Web page
- A Sign In, Sign Up page.
- A different dashboard for the student and for the admin.
- RBAC feature to implement different acccess to the user and the admin.

## Student
- Can see the list of books and quantity available
- Can see his/her due date of submission
- Can see his/her penality for late submission (updates automatically with time)\
For each day of late submission, penality increases by x, or any custom function to calculate penality
- Can see his/her previous record of taken books

## Admin 
- Can see the list of students
- Can access the students records of books taken
- Can issue book
- Can take book
- Can add book
- Can remove book
- Can decide set of emails well in advance which can register (Ex : Only college mail)

# Server 
- Raspberry pi is the server, and the college email Id will be linked to the accounts for verification and access.
- Send mails accordingly when book issued or when book submitted, also 3 days before the deadline (Like a notification system on the mail)
