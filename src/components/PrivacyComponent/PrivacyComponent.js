import React from "react";
import StaticPageHeaderComponent from "../PageCommonComponent/StaticPageHeaderComponent";

const PrivacyComponent = () => {
  return (
    <div className="d-block bg-white-custom">
      <StaticPageHeaderComponent
        title="Privacy Policy"
        description_sm={"Please review our privacy policy content"}
      />
      <div className="container py-5">
        <div className="d-block">
          <p className="display-6 fw-bold">Identity & access</p>
          <div className="d-block">
            <span>
              When you sign up for FirmConnector, we ask for your name, company
              name, and email address. That’s just so you can personalize your
              new account, and we can send you invoices, updates, or other
              essential information. We’ll never sell your personal info to
              third parties, and we won’t use your name or company in marketing
              statements without your permission, either.
            </span>
          </div>
          <div className="d-block mt-2">
            <span>
              When you write FirmConnector with a question or to ask for help,
              we’ll keep that correspondence, and the email address, for future
              reference. When you browse our pages, we track that information
              for statistical purposes using Google Analytics (like conversion
              rates and to test new designs). We also store any information you
              volunteer, like surveys, for as long as it makes sense.
            </span>
          </div>
          <div className="d-block mt-2">
            <p className="fw-bold">
              The only times we’ll ever share your info:
            </p>
            <ul>
              <li>
                <span>
                  To provide products or services you’ve requested, with your
                  permission.
                </span>
              </li>
              <li>
                <span>
                  To investigate, prevent, or take action regarding illegal
                  activities, suspected fraud, situations involving potential
                  threats to the physical safety of any person, violations of
                  our Terms of Service, or as otherwise required by law.
                </span>
              </li>
              <li>
                <span>
                  If FirmConnector is acquired by or merged with another company
                  — we don’t plan on that, but if it happens — we’ll notify you
                  well before any info about you is transferred and becomes
                  subject to a different privacy policy.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-block mt-5">
          <p className="display-6 fw-bold">
            Your Rights With Respect to Your Information
          </p>
          <div className="d-block">
            <span>
              You may have heard about the General Data Protection Regulation
              (“GDPR”) in Europe. GDPR gives people under its protection certain
              rights with respect to their personal information collected by us
              on the Site. Accordingly, FirmConnector recognizes and will comply
              with GDPR and those rights, except as limited by applicable law.
              The rights under GDPR include:
            </span>
          </div>
          <div className="d-block mt-2">
            <ul>
              <li>
                <span>
                  <strong>Right of Access.</strong> This includes your right to
                  access the personal information we gather about you, and your
                  right to obtain information about the sharing, storage,
                  security and processing of that information.
                </span>
              </li>
              <li>
                <span>
                  <strong>Right to Correction.</strong> This is your right to
                  request correction of your personal information.
                </span>
              </li>
              <li>
                <span>
                  <strong>Right to Erasure.</strong> This is your right to
                  request, subject to certain limitations under applicable law,
                  that your personal information be erased from our possession
                  (also known as the “Right to be forgotten”). However, if
                  applicable law requires us to comply with your request to
                  delete your information, fulfillment of your request may
                  prevent you from using FirmConnector services and may result
                  in closing your account.
                </span>
              </li>
              <li>
                <span>
                  <strong>Right to Complain.</strong> You have the right to make
                  a complaint regarding our handling of your personal
                  information with the appropriate supervisory authority.
                </span>
              </li>
              <li>
                <span>
                  <strong>Right to Restrict Processing.</strong> This is your
                  right to request restriction of how and why your personal
                  information is used or processed.
                </span>
              </li>
              <li>
                <span>
                  <strong>Right to Object.</strong> This is your right, in
                  certain situations, to object to how or why your personal
                  information is processed.
                </span>
              </li>
              <li>
                <span>
                  <strong>Right to Portability.</strong> This is your right to
                  receive the personal information we have about you and the
                  right to transmit it to another party.
                </span>
              </li>
              <li>
                <span>
                  <strong>
                    Right to not be subject to Automated Decision-Making.
                  </strong>{" "}
                  This is your right to object and prevent any decision that
                  could have a legal, or similarly significant, effect on you
                  from being made solely based on automated processes. This
                  right is limited, however, if the decision is necessary for
                  performance of any contract between you and us, is allowed by
                  applicable European law, or is based on your explicit consent.
                </span>
              </li>
            </ul>
          </div>
          <div className="d-block mt-2">
            <span>
              Many of these rights can be exercised by signing in and directly
              updating your account information. If you have questions about
              exercising these rights or need assistance, please contact us at{" "}
              <span className="text-info-light-custom fw-bold">
                info@firmconnector.com
              </span>
              .
            </span>
          </div>
        </div>

        <div className="d-block mt-5">
          <p className="display-6 fw-bold">Law enforcement</p>
          <div className="d-block">
            <span>
              FirmConnector won't hand your data over to law enforcement unless
              a court order says we have to. We flat-out reject requests from
              local and federal law enforcement when they seek data without a
              court order. And unless we’re legally prevented from it, we’ll
              always inform you when such requests are made.
            </span>
          </div>
        </div>

        <div className="d-block mt-5">
          <p className="display-6 fw-bold">Security & Encryption</p>
          <div className="d-block">
            <span>
              All data is encrypted via{" "}
              <span className="text-info-light-custom fw-bold">SSL/TLS</span>{" "}
              when transmitted from our servers to your browser. The database
              backups are also encrypted. Data isn’t encrypted while it's live
              in our database (since it needs to be ready to send to you when
              you need it), but we go to great lengths to secure your data at
              rest. such requests are made.
            </span>
          </div>
        </div>

        <div className="d-block mt-5">
          <p className="display-6 fw-bold">Deleted data</p>
          <div className="d-block">
            <span>
              When you cancel your account, we'll ensure that nothing is stored
              on our servers past 30 days. Anything you delete on your account
              while it's active will also be purged within 30 days (up until
              then it’s available in the trash can).
            </span>
          </div>
        </div>

        <div className="d-block mt-5">
          <p className="display-6 fw-bold">Location of Site and Data</p>
          <div className="d-block">
            <span>
              This Site is operated in Canada. If you are located in the
              European Union or elsewhere outside of Canada, please be aware
              that any information you provide to us will be transferred to
              Canada. By using our Site, participating in any of our services
              and/or providing us with your information, you consent to this
              transfer.
            </span>
          </div>
        </div>

        <div className="d-block mt-5">
          <p className="display-6 fw-bold">Changes & questions</p>
          <div className="d-block">
            <span>
              FirmConnector may update this policy once in a blue moon — we’ll
              notify you about significant changes by emailing the account owner
              or by placing a prominent notice on our site. You can access,
              change or delete your personal information at any time by
              contacting us.
            </span>
          </div>
          <div className="d-block mt-2">
            <span>
              Questions about this privacy policy? Please get in touch and we’ll
              be happy to answer them!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyComponent;
