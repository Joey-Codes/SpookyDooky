import { useEffect } from "react";

export const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div style={{height: "auto", textAlign: "center", marginTop: "50px"}}>
            <h1 className="readexpro rp2">Privacy Policy</h1>
            <br />
            <div style={{margin: "0 15% 0 15%", fontFamily: "readexpro"}}>
                <br />
                <h3>Last Updated: 11/6/2023</h3>
                <br />
                <h2>INTRODUCTION</h2>
                <h3>Welcome to Spooky Dooky (the "Website"). At Spooky Dooky, 
                we take your privacy seriously and are committed to protecting your personal information. This 
                Privacy Policy outlines how we collect, use, and safeguard your data while you use our Website.
                </h3>
                <br />
                <h2>INFORMATION WE COLLECT</h2>
                <h3>User Account Information: When you create an account on our Website, 
                    we may collect personal information such as your name and email address which is done through Google Oauth.
                </h3>
                <h3>Review Content: When you post reviews on our Website,  we collect the content you submit, 
                    which includes text and images.
                </h3>
                <h3>Communication: We may collect any information you provide to us when you contact our 
                    support email.
                </h3>
                <h3>Cookies: We use cookies to collect data about your activity on the Website. You can manage
                    your cookie preferences using your browser settings.
                </h3>
                <br />
                <h2>HOW WE USE YOUR INFORMATION</h2>
                <h3>User Account: To create and manage your user account, authenticate you, and provide you with 
                    access to the Website.
                </h3>
                <h3>Content and Reviews: To display the reviews and content you submit, including your username,
                    and to associate your reviews with your account.
                </h3>
                <h3>Improvement: To improve and enhance our Website, including its functionality, user experience,
                    and content.
                </h3>
                <h3>Communication: To respond to your inquiries and provide support.</h3>
                <br />
                <h2>SHARING YOUR INFORMATION</h2>
                <h3>With Other Users: Your username and the content you post on the Website are visible to other users.</h3>
                <h3>Legal Compliance: We may share your information when required by law, to protect our rights, or in response to a legal request.</h3>
                <br />
                <h2>YOUR CHOICES</h2>
                <h3>Account Information: You can delete your account at any time by visiting the 'Profile' page.</h3>
                <h3>Reviews: You can delete your reviews at any time by visiting the 'Profile' page.</h3>
                <h3>Cookies: You can manage cookie preferences in your browser settings.</h3>
                <br />
                <h2>CHANGES TO THIS POLICY</h2>
                <h3>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Last updated" date will be revised.</h3>
                <br />
                <h2>CONTACT US</h2>
                <h3>If you have any questions or concerns about this Privacy Policy, please email us at spookydooky35@gmail.com</h3>
            </div>
        </div>
    );
};