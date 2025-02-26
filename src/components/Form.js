import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(72, 'Too Long!')
      .required('This field is required')
      ,
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(72, 'Too Long!')
      .required('This field is required'),
    email: Yup.string().email('Please enter a valid email address').required('Email address is required'),
    generalEnquiry: Yup.string().required('Please select a query type'),
    message: Yup.string()
      .min(2, 'Too Short!')
      .max(5000, 'Too Long!')
      .required('This field is required'),
      consent: Yup.boolean().oneOf([true], 'To submit this form, please consent to being contacted')
});


export default function ContactForm() {
    
    
    return (
        
        <section className="my-10 lg:my-0 lg:flex lg:justify-center lg:items-center lg:h-screen">
                <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto w-full">
                    <h2 className="text-teal-950 text-center lg:text-left text-2xl font-semibold mb-8">Contact Us</h2>

                    {/* Toast Container - Mesaj de confirmare ca form-ul a fost submitted cu succes */}
                    <ToastContainer theme='colored' position='top-center'/>

                    <Formik  initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                message: '',
                                generalEnquiry: '',
                                
                            }}
                            validationSchema={ContactSchema}
                            onSubmit={(values) =>  toast.success("Message Sent! Thanks for completing the form. We'll be in touch soon!")}
                            >
                                
                        {({ errors, touched }) => (
                            <Form className="grid gap-4">
                               
                        <div className="grid lg:grid-cols-2 gap-4">
                            {/* FIRST NAME SI LAST NAME */}
                            <article>
                                <label htmlFor="first-name" className="mb-2 ">First Name *</label>
                                <Field id="first-name" name="firstName" />
                                {errors.firstName && touched.firstName ? (
             <div className='text-rose-400 text-sm py-1'>{errors.firstName}</div>
           ) : null}
                            </article>
                            <article>
                                <label htmlFor="last-name" className="mb-2">Last Name *</label>
                                <Field id="last-name" name="lastName" />
                                {errors.lastName && touched.lastName ? (
             <div className='text-rose-400 text-sm py-1'>{errors.lastName}</div>
           ) : null}
                            </article>
                            
                        </div>
                        {/* EMAIL */}
                        <div>
                            <label htmlFor="email-address" className="mb-2">Email Address *</label>
                            <Field id="email-address" name="email" />
                            {errors.email && touched.email ? <div className='text-rose-400 text-sm py-1'>{errors.email}</div> : null}
                        </div>
                           
                        {/* QUERY TYPE */}
                        <div>
                            <label htmlFor="general-enquiry" className="mb-2">Query Type *</label>
                        
                            <article className="grid gap-4 lg:grid-cols-2">
                                <div className="border-2 border-slate-400 rounded py-2 px-4  text-sm hover:border-teal-700 focus:border-teal-700 transition">
                                    <Field type="radio" id="general-enquiry" name="generalEnquiry" value="general-enquiry" className="w-auto" />{" "}General Enquiry
                                    
                                </div>                 
                            
                                <div className="border-2 border-slate-400 rounded py-2 px-4  text-sm hover:border-teal-700 focus:border-teal-700 transition">
                                    <Field type="radio" id="support-request" name="generalEnquiry" value="support-request" className="w-auto" />{" "}Support Request
                                    
                                </div>
                                {errors.generalEnquiry && touched.generalEnquiry ? (
             <div className='text-rose-400 text-sm mb-2'>{errors.generalEnquiry}</div>
           ) : null}                  
                            </article>

                        </div>
                        {/* MESSAGE */}
                        <div>
                            <label htmlFor="message" className="mb-2">Message *</label>
                            <Field id="message" name="message" cols="30" rows="10"></Field>
                            {errors.message && touched.message ? <div className='text-rose-400 text-sm'>{errors.message}</div> : null}
                        </div>
                        <div className="text-teal-800 text-sm">
                            <input type="checkbox" name="consent" id="consent" className="w-auto"/> I consent to being contacted by the team *
                            {errors.consent && touched.consent ? (
             <div className='text-rose-400 text-sm mb-2'>{errors.consent}</div>
           ) : null}  
                        </div>
                        <button type="submit" className="bg-teal-700 text-white font-semibold py-2 px-4 rounded hover:bg-teal-900 transition">Submit</button>
                    
                            </Form>
                        )}
                    </Formik>        


                    
                    
                </div>
        </section> 
    )
}