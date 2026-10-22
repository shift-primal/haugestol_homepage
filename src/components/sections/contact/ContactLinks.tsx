import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Fragment } from "react";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemGroup,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from "#/components/shadcn/item";
import { CONTACT_LINKS } from "#/content/contact";
import { m } from "#/paraglide/messages";

export const ContactLinks = () => {
    return (
        <div className="order-first flex w-full max-w-md flex-col pointer-events-auto px-4 py-4 sm:max-w-full lg:order-none lg:w-auto lg:flex-1 lg:px-8 lg:py-8">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-semibold">{m.contact_links_heading()}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                    {m.contact_response_time()}
                </span>
            </div>
            <ItemGroup className="gap-0">
                {CONTACT_LINKS.map(({ label, href, icon: Icon }, index) => (
                    <Fragment key={label}>
                        {index !== 0 && (
                            <ItemSeparator className="my-1 bg-accent/75" />
                        )}
                        <Item
                            className="[a]:hover:bg-transparent"
                            render={(props) => (
                                <a
                                    {...props}
                                    href={href}
                                    target={
                                        href.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        href.startsWith("http")
                                            ? "noreferrer"
                                            : undefined
                                    }
                                />
                            )}
                        >
                            <ItemMedia variant="icon-circle">
                                <Icon />
                            </ItemMedia>
                            <ItemContent className="min-w-0 flex-row items-center gap-2">
                                <span
                                    aria-hidden
                                    className="text-muted-foreground"
                                >
                                    {">"}
                                </span>
                                <ItemTitle className="font-mono text-foreground/90">
                                    {label}
                                </ItemTitle>
                            </ItemContent>
                            <ItemActions>
                                <ArrowUpRightIcon className="size-3.5 -translate-x-0.5 text-muted-foreground opacity-0 transition-all duration-base group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                            </ItemActions>
                        </Item>
                    </Fragment>
                ))}
            </ItemGroup>
        </div>
    );
};
