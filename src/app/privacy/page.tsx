export default function PrivacyPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-16">
            <h1 className="font-heading text-h3 text-on-surface">Privacy Policy</h1>
            <div className="mt-6 flex flex-col gap-5 font-body text-body-md text-on-surface-variant">
                <p>This describes what CareerOS actually stores and does with your data — not a generic template.</p>

                <div>
                    <h2 className="font-heading text-h5 text-on-surface">What we store</h2>
                    <p className="mt-2">
                        Your name, email, and a hashed password (or a Google account link, if you sign in that way). If you fill
                        out your profile: skills, experience level, preferred roles/locations, and any resume text you paste in.
                        If you use the application tracker or leave a company review, that content is stored too.
                    </p>
                </div>

                <div>
                    <h2 className="font-heading text-h5 text-on-surface">What we send to third parties</h2>
                    <p className="mt-2">
                        Job listings come from Adzuna&apos;s API — your search terms are sent to Adzuna to run that search. If
                        you use AI Recommendations or the Content Generator, your profile data and resume text are sent to Groq
                        to generate results. Company logos are requested from Clearbit and ui-avatars. None of these are given
                        your account credentials.
                    </p>
                </div>

                <div>
                    <h2 className="font-heading text-h5 text-on-surface">Cookies</h2>
                    <p className="mt-2">
                        One httpOnly cookie holds a refresh token used to keep you signed in. It isn&apos;t readable by
                        JavaScript and isn&apos;t used for tracking or advertising.
                    </p>
                </div>

                <div>
                    <h2 className="font-heading text-h5 text-on-surface">Deleting your data</h2>
                    <p className="mt-2">
                        There is currently no self-serve account deletion in the product. Contact us and we&apos;ll remove your
                        account and associated data manually.
                    </p>
                </div>
            </div>
        </div>
    );
}