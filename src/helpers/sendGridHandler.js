import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

class SendGridHelper {
    static async sendConfirmationMail (token, emailAddress) {
      const server = process.env.SERVER || 'https://phidi.herokuapp.com/';

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: emailAddress,
            from: 'daniel.maina@etinx.com',
            subject: 'Confirm email address.',
            text: `Click on this link to verify your email ${server}verification?token=${token}&email=${emailAddress}`,
            html: `<p>Click on this link to verify your email ${server}verification?token=${token}&email=${emailAddress}</p>`,
          };

          sgMail
          .send(msg)
          .then(() => {}, error => {
            console.error(error);
         
            if (error.response) {
              console.error(error.response.body)
            }
          });
        //ES8
        (async () => {
          try {
            await sgMail.send(msg);
          } catch (error) {
            console.error(error);
         
            if (error.response) {
              console.error(error.response.body)
            }
          }
        })();

    }

    static async sendForgotPasswordMail (emailAddress) {
      const server = process.env.SERVER || 'https://phidi.herokuapp.com/';

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
          to: emailAddress,
          from: 'daniel.maina@etinx.com',
          subject: 'Reset Phidi password.',
          text: `Click on this link to reset you password ${server}reset-password?email=${emailAddress}`,
          html: `<p>Click on this link to reset you password ${server}reset-password?email=${emailAddress}</p>`,
        };

        sgMail
        .send(msg)
        .then(() => {}, error => {
          console.error(error);
       
          if (error.response) {
            console.error(error.response.body)
          }
        });
      //ES8
      (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);
       
          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();

  }

  static async sendBidEmailToJobPostOwner (firstName, email, jobPostId) {
    const server = process.env.SERVER || 'https://phidi.herokuapp.com/';

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email,
        from: 'daniel.maina@etinx.com',
        subject: 'Your job post has a new bid.',
        text: `Hi, ${firstName}, your job post has a new bid.Click on this link to view: ${server}job-post/${jobPostId}`,
      };

      sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      });
    //ES8
    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();
}

  static async sendAccessAuthorizationBidAccepted (bidderEmail, jobPostId) {
    const server = process.env.SERVER || 'https://phidi.herokuapp.com/';

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: bidderEmail,
        from: 'daniel.maina@etinx.com',
        subject: 'View access authorized to private job post.',
        text: `Hi, you have been authorised to view/bid to this private job post: ${server}job-post-bid/${jobPostId}`,
      };

      sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      });
    //ES8
    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();
}

static async sendAccessAuthorizationBidRejected (bidderEmail) {
  const server = process.env.SERVER || 'https://phidi.herokuapp.com/';

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
      to: bidderEmail,
      from: 'daniel.maina@etinx.com',
      subject: 'View access authorized to private job post.',
      text: `Hi, you access bid to view a private job post has been rejected.Here's the link to view the bid: ${server}bids`,
    };

    sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
      }
    });
  //ES8
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();
}

static async sendAccessAuthorizationBidEmail (ownerFirstName, jobPostOwnerEmail, jobPostId) {
  const server = process.env.SERVER || 'https://phidi.herokuapp.com/';

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
      to: jobPostOwnerEmail,
      from: 'daniel.maina@etinx.com',
      subject: 'View access bid to your private job post.',
      text: `Hi ${ownerFirstName}, a user is asking for access to view/bid on your private job post.To grant access or reject the request, click on: ${server}job-post/${jobPostId}`,
    };

    sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
      }
    });
  //ES8
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();
  }

  static async sendAcceptedBidEmail (emailAddress, bidId) {
    const server = process.env.SERVER || 'https://phidi.herokuapp.com/';

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: emailAddress,
        from: 'daniel.maina@etinx.com',
        subject: 'Bid accepted.',
        text: `Hi, your bid for this job post has been accepted: ${server}bid-details/${bidId}`,
        html: `<p>Hi, your bid for this job post has been accepted: ${server}bid-details/${bidId}</p>`,
      };

      sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      });
    //ES8
    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();

}

static async sendPaymentConfirmationEmail (emailAddress, message) {
  const server = process.env.SERVER || 'https://phidi.herokuapp.com/';
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
      to: emailAddress,
      from: 'daniel.maina@etinx.com',
      subject: 'Payment Received.',
      text: `${message}`,
      html: `<p>${message}</p>`,
    };

    sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
      }
    });
  //ES8
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();

}

}

export default SendGridHelper;