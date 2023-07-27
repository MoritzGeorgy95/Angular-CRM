import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-walkthrough',
  templateUrl: './dialog-walkthrough.component.html',
  styleUrls: ['./dialog-walkthrough.component.scss'],
})
export class DialogWalkthroughComponent {
  index: number = 0;
  tutorialSlides: Array<any> = [
    {
      title: 'Welcome to Toolio CRM!',
      img: 'welcome.jpg',
      description:
        "A lightweight customer relationship management tool, that allows you to create clients, upload client documents, create projects and set client events. This tutorial will guide you through the main functionalities of my web application. Let's dive in together, click Next to start the journey! ",
    },
    {
      title: 'Dashboard',
      img: 'dashboard.png',
      description:
        'On the dashboard page, click on widgets to try out their functionality. You can also reposition widgets by dragging them around on bigger screens. The notifications widget displays all calendar events with a start date set to today.',
    },
    {
      title: 'Clients',
      img: 'clients.png',
      description:
        'Get an overview over all client accounts you have created. To create a new client, click on the add (+) button and enter all necessary data. You can also search clients by typing in their name or filter clients by several criteria such as company, gender or city. To see all client details, click on the details option in the clients table.',
    },
    {
      title: 'Client Details',
      img: 'details.png',
      description:
        'Once you have clicked on a client you see an overview of all client data. You can edit data or delete a client account by clicking on the three dot menu in the upper right corner. You can also send a direct message by clicking the "message" button. To upload documents associated to a client (like invoices, bills etc.) click on the plus button in the documents box. To create a project click on the plus button in the projects box. Projects get sorted automatically and get marked as either red, orange or green depending on the deadline you set for it. To delete projects or documents click on the trashcan button in the respective box.',
    },

    {
      title: 'News',
      img: 'news.png',
      description:
        "Stay up-to-date with the 'News' section. Thanks to the integration of the Gnews API, you receive daily current news from the world that are trending on Google Notifications.",
    },
    {
      title: 'Help',
      img: 'help.png',
      description:
        'Navigate to the Help section anytime you need an overview of the functionalities of this app. There, you can also revisit this tutorial.',
    },
    {
      title: 'Congratulations!',
      img: 'start.jpg',
      description:
        'Now you have a solid understanding of how Toolio works and are set to go! Remember, this tool is for demonstration purposes, so feel free to explore and test all features without hesitation. Happy exploring!',
    },
  ];

  constructor(private dialog: MatDialog) {}

  close() {
    this.dialog.closeAll();
  }

  next() {
    this.index++;
  }

  previous() {
    this.index--;
  }
}
