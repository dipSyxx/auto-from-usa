// !! RESEND
// import { NextResponse,NextRequest } from 'next/server'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)


// export async function POST(req:NextRequest) {
//     try {
//       const body = await req.json()
//       console.log('body',body)
//       const {name,
//       email,
//       phone,
//       message,} = body
//       const data = await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: 'linetsky.yura@gmail.com',
//       subject: `Клієнт на імя ${name} хоче звязатися з вами`,
//       html: `<h1>Contact Form Data:</h1>
//       <p>Name: ${name}</p>
//       <p>Email: ${email}</p>
//       <p>Phone: ${phone}</p>
//       <p>Message: ${message}</p>`,
//       })
//         return NextResponse.json({data})
//     } catch (error) {
//       return NextResponse.json({error})
//     }
// }


//!! NODEMAILER
import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, car } = body;

    // Set up the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'linetsky.yura@gmail.com',
      to: 'linetsky.yura@gmail.com',
      subject: `Клієнт на імя ${name} хоче звязатися з вами`,
      html: `<h1>Contact Form Data:</h1>
      <p>Car: ${car}</p>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ info });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error });
  }
}
