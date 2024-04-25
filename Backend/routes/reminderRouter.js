const { client } = require("../database/database");
const nodemailer = require("nodemailer");
const db = client.db("integrativeProjectDB");
const ActivitiesCollection = db.collection("Activities");


// This function sends the reminder emails to the registered users of the activities.
async function sendEmails() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "integrativeprojectgroupthree@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const currentDate = new Date();
  const threeDaysFromNow = new Date(
    Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate() + 3,
      0,
      0,
      0
    )
  );
  const fourDaysFromNow = new Date(
    Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate() + 4,
      0,
      0,
      0
    )
  );

  // Get the activities coming in three days from now.
  const activities = await ActivitiesCollection.find({
    StartDate: {
      $gte: threeDaysFromNow,
      $lt: fourDaysFromNow,
    },
  }).toArray();

  // Iterate over each activity and send email to registered users of that activity.
  for (const activity of activities) {
    //console.log("activity.StartDate: ", (activity.StartDate));
    //console.log("activity.EndDate: ", (activity.EndDate));

    // Send an email to each registered user
    for (const email of activity.registeredUsers) {
      let htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h3>${activity.post_title}</h3>
          <p>Bonjour, nous voulons vous rappeler que vous êtes inscrit à l'activité suivante : ${activity.post_title}. Elle aura lieu dans trois jours !</p>
        </div>`;
      htmlContent += `<p>L'événement commence à : ${(
        activity.StartDate
      )}</p>`;
      htmlContent += `<p>Et se termine à : ${(
        activity.EndDate
      )}</p>`;
      htmlContent += `<p>${activity.post_content}</p>`;
      htmlContent += `<img src="${activity.post_thumbnail}" alt="Activity Thumbnail" style="width: 100%; max-width: 600px;">`;
      htmlContent += `<p>Cliquez sur ce <button onclick="window.location.href='${activity.event_url}'">${activity.post_title}</button> pour accéder à l'article de l'événement sur le site de Valcourt2030 et voir les détails de l'événement.</p>`;

      await transporter.sendMail(
        {
          from: '"Valcourt2030" <integrativeprojectgroupthree@gmail.com>',
          to: email,
          subject: `L'événement ${
            activity.post_title
          } auquel vous vous êtes inscrit aura lieu le ${new Date(
            activity.StartDate
          ).toLocaleDateString("fr-FR")} `,
          html: htmlContent,
        },
        function (error, info) {
          if (error) {
            //console.log(error);
          } else {
            //console.log("Email sent: " + info.response);
          }
        }
      );
    }
  }
}

// Export the function
module.exports = sendEmails;
