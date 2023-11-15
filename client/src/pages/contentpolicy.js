import { useEffect } from "react";

export const ContentPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div style={{height: "auto", textAlign: "center", marginTop: "50px"}}>
            <h1 className="readexpro rp2">Content Policy</h1>
            <br />
            <div style={{margin: "0 15% 0 15%", fontFamily: "readexpro"}}>
                <br />
                <h3>Last Updated: 11/6/2023</h3>
                <br />
                <h2>INTRODUCTION</h2>
                <h3>Welcome to Spooky Dooky (the "Website"). Our Content Policy is designed to ensure a safe and respectful 
                    environment for all users. By using our Website, you agree to comply with this policy.
                </h3>
                <br />
                <h2>ACCEPTABLE CONTENT</h2>
                <h3>Users are encouraged to contribute content, such as reviews and images, that are relevant to the topic 
                    of paranormal locations/experiences/descriptions. Reviews on our Website are meant for informational purposes 
                    and should not be construed as endorsements or judgments of businesses from a commercial standpoint.
                </h3>
                <br />
                <h2>PROHIBITED CONTENT</h2>
                <h3>By using this Website, you commit to refraining from submitting or linking to any Content (including text and images) 
                    that is defamatory, spam-related, abusive, threatening, offensive, contains explicit or 
                    obscene material, poses a risk of copyright infringement, promotes unlawful activities, divulges personal information 
                    of others, or contravenes any legal statutes. You bear full responsibility for the content and any consequent 
                    harm stemming from such content or your actions.
                </h3>
                <br />
                <h2>CONTENT ENFORCEMENT</h2>
                <h3>We reserve the right to enforce this Content Policy through various means, including the removal of reviews, suspension,
                    or banning of users who violate these rules. We will take action as we deem appropriate, with or without notice.
                </h3>
                <br />
                <h2>REPORTING VIOLATIONS</h2>
                <h3>If you encounter content that violates this policy, please report it by emailing spookydooky35@gmail.com. Your 
                    reports help us maintain a safe and respectful community.
                </h3>
                <br />
                <h2>CHANGES TO THIS CONTENT POLICY</h2>
                <h3>We may update this Content Policy from time to time to reflect changes in our community guidelines or to address new issues. 
                    Any changes will be posted on this page, and the "Last updated" date will be revised accordingly.
                </h3>
                <br />
                <h2>CONTACT US</h2>
                <h3>If you have any questions or concerns about this Privacy Policy, please email us at spookydooky35@gmail.com</h3>
            </div>
        </div>
    );
};