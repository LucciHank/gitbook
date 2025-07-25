import type { GitBookSiteContext } from '@/lib/context';
import { CustomizationHeaderPreset } from '@gitbook/api';
import React from 'react';

import { Footer } from '@/components/Footer';
import { Header, HeaderLogo } from '@/components/Header';
import { SearchButton, SearchModal } from '@/components/Search';
import { TableOfContents } from '@/components/TableOfContents';
import { CONTAINER_STYLE } from '@/components/layout';
import { getSpaceLanguage } from '@/intl/server';
import { t } from '@/intl/translate';
import { tcls } from '@/lib/tailwind';

import type { VisitorAuthClaims } from '@/lib/adaptive';
import { GITBOOK_API_PUBLIC_URL, GITBOOK_APP_URL } from '@/lib/env';
import { AIChat } from '../AIChat';
import { Announcement } from '../Announcement';
import { SpacesDropdown } from '../Header/SpacesDropdown';
import { InsightsProvider } from '../Insights';
import { SiteSectionList, encodeClientSiteSections } from '../SiteSections';
import { CurrentContentProvider } from '../hooks';
import { SpaceLayoutContextProvider } from './SpaceLayoutContext';

/**
 * Render the entire layout of the space (header, table of contents, footer).
 */
export function SpaceLayout(props: {
    context: GitBookSiteContext;

    /** Whether to enable tracking of events into site insights. */
    withTracking: boolean;

    /** The visitor auth claims. */
    visitorAuthClaims: VisitorAuthClaims;

    /** The children of the layout. */
    children: React.ReactNode;
}) {
    const { context, withTracking, visitorAuthClaims, children } = props;
    const { siteSpace, customization, sections, siteSpaces } = context;

    const withTopHeader = customization.header.preset !== CustomizationHeaderPreset.None;

    const withSections = Boolean(sections && sections.list.length > 1);
    const isMultiVariants = Boolean(siteSpaces.length > 1);

    const withFooter =
        customization.themes.toggeable ||
        customization.footer.copyright ||
        customization.footer.logo ||
        customization.footer.groups?.length;

    const withAIChat =
        context.customization.aiSearch.enabled &&
        (context.site.id === 'site_p4Xo4' || context.site.id === 'site_JOVzv');

    return (
        <SpaceLayoutContextProvider basePath={context.linker.toPathInSpace('')}>
            <CurrentContentProvider
                organizationId={context.organizationId}
                siteId={context.site.id}
                siteSectionId={context.sections?.current?.id ?? null}
                siteSpaceId={context.siteSpace.id}
                siteShareKey={context.shareKey ?? null}
                spaceId={context.space.id}
                revisionId={context.revisionId}
                visitorAuthClaims={visitorAuthClaims}
            >
                <InsightsProvider
                    enabled={withTracking}
                    appURL={GITBOOK_APP_URL}
                    apiHost={GITBOOK_API_PUBLIC_URL}
                    visitorCookieTrackingEnabled={context.customization.insights?.trackingCookie}
                >
                    <Announcement context={context} />
                    <Header
                        withTopHeader={withTopHeader}
                        withAIChat={withAIChat}
                        context={context}
                    />
                    {withAIChat ? <AIChat /> : null}
                    <div className="scroll-nojump">
                        <div className="transition-all duration-300 lg:chat-open:mr-80 xl:chat-open:mr-96">
                            <div
                                className={tcls(
                                    'flex',
                                    'flex-col',
                                    'lg:flex-row',
                                    CONTAINER_STYLE,
                                    'site-full-width:max-w-full',

                                    // Ensure the footer is display below the viewport even if the content is not enough
                                    withFooter && 'min-h-[calc(100vh-64px)]',
                                    withTopHeader ? null : 'lg:min-h-screen'
                                )}
                            >
                                <TableOfContents
                                    context={context}
                                    header={
                                        withTopHeader ? null : (
                                            <div
                                                className={tcls(
                                                    'hidden',
                                                    'pr-4',
                                                    'lg:flex',
                                                    'grow-0',
                                                    'flex-wrap',
                                                    'dark:shadow-light/1',
                                                    'text-base/tight'
                                                )}
                                            >
                                                <HeaderLogo context={context} />
                                            </div>
                                        )
                                    }
                                    innerHeader={
                                        // displays the search button and/or the space dropdown in the ToC according to the header/variant settings. E.g if there is no header, the search button will be displayed in the ToC.
                                        <>
                                            {!withTopHeader && (
                                                <div className={tcls('hidden', 'lg:block')}>
                                                    <React.Suspense fallback={null}>
                                                        <SearchButton>
                                                            <span className={tcls('flex-1')}>
                                                                {t(
                                                                    getSpaceLanguage(customization),
                                                                    customization.aiSearch.enabled
                                                                        ? 'search_or_ask'
                                                                        : 'search'
                                                                )}
                                                                ...
                                                            </span>
                                                        </SearchButton>
                                                    </React.Suspense>
                                                </div>
                                            )}
                                            {!withTopHeader && withSections && sections && (
                                                <SiteSectionList
                                                    className={tcls('hidden', 'lg:block')}
                                                    sections={encodeClientSiteSections(
                                                        context,
                                                        sections
                                                    )}
                                                />
                                            )}
                                            {isMultiVariants && !sections && (
                                                <SpacesDropdown
                                                    context={context}
                                                    siteSpace={siteSpace}
                                                    siteSpaces={siteSpaces}
                                                    className={tcls(
                                                        'w-full',
                                                        'page-no-toc:hidden',
                                                        'site-header-none:page-no-toc:flex'
                                                    )}
                                                />
                                            )}
                                        </>
                                    }
                                />
                                <div className="flex min-w-0 flex-1 flex-col">{children}</div>
                            </div>
                        </div>
                    </div>

                    {withFooter ? <Footer context={context} /> : null}

                    <React.Suspense fallback={null}>
                        <SearchModal
                            spaceTitle={siteSpace.title}
                            withAsk={customization.aiSearch.enabled}
                            withAIChat={withAIChat}
                            isMultiVariants={isMultiVariants}
                        />
                    </React.Suspense>
                </InsightsProvider>
            </CurrentContentProvider>
        </SpaceLayoutContextProvider>
    );
}
