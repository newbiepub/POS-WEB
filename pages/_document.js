import React from "react";
import Document, { Head as NextHead, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import Head from "../component/head/head";

export default class AppDocument extends Document {
    static getInitialProps({renderPage}) {
        const { html, head, errorHtml, chunks } = renderPage();
        const styles = flush();
        return { html, head, errorHtml, chunks, styles }
    }

    render() {
        return (
            <html>
                <NextHead>
                    <Head/>
                </NextHead>
                <body>
                    <script src="/static/js/materialize.js" type="text/javascript"></script>
                    <script type="text/javascript" src="/static/js/csvParser.js"></script>
                    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/xlsx/0.12.3/xlsx.full.min.js"></script>
                    <script src={'/static/js/main.js'}></script>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        )
    }
}