import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { ContactLinks } from "#/components/sections/contact/ContactLinks";
import { MessageForm } from "#/components/sections/contact/MessageForm";
import { m } from "#/paraglide/messages";

export const Contact = () => {
    return (
        <SectionContainer sectionName="contact">
            <SectionHeading
                text={m.contact_heading()}
                kicker="// contact"
            />

            <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8">
                <MessageForm />
                <div className="w-full lg:w-auto flex flex-col gap-8 items-center lg:flex-row lg:items-stretch">
                    <div className="flex w-full max-w-md items-center gap-4 pointer-events-auto sm:max-w-full lg:w-auto lg:flex-col lg:self-stretch">
                        <span className="h-px flex-1 bg-border lg:h-auto lg:w-px" />
                        <span className="font-mono text-xs tracking-widest text-muted-foreground">
                            {m.contact_or_divider()}
                        </span>
                        <span className="h-px flex-1 bg-border lg:h-auto lg:w-px" />
                    </div>
                </div>
                <ContactLinks />
            </div>
        </SectionContainer>
    );
};
