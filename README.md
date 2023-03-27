# Events-API2
Hello, welcome to Events API2


User Story: As an event organizer, I want to create and manage events through a web platform. I should be able to:

Register and log in to the platform (I should get a welcome mail when I register).
Create new events with details such as name, date, location, description.
Manage attendees by adding, editing and removing attendees from the event (attendees should get a mail when they are added to or removed from an event).
Generate reports for each event with information about attendee count etc.

As an admin, I want to be able to approve or reject events created  by users. If an event is rejected, the admin should provide a reason for the rejection, which will be sent to the user via email. I should be able to:

i) Log in to the platform.
ii) Approve or reject events.
iii) Delete events that are no longer needed.
iv)  View a list of all the registered attendees for each event.




The Events API2 caters for the user demands as well as the admin's demand by using role based access control.
Based on the role of the user(ADMIN, or BASIC), certain routes and resources are accessible.
To ensure order, only the user who creates an event has access to update, view/get and delete the event. An exception to this is when the user has the role: ADMIN, if the user plays the role of an ADMIN, the user can get and delete the event, however the ADMIN user cannot edit the event like the user who created the event. The ADMIN user is the only one who has permission to approve or reject created event, as well as viewing all the events in the database.

Please checkout the API documentation for more details. Thank you for using Events-API2.



Render link: https://events-api2.onrender.com

Mailtrap login { email: lulachan52@gmail.com
                password: lulachan@52 }
                
                
Events API documentation: https://documenter.getpostman.com/view/24385383/2s93RKzvUR
