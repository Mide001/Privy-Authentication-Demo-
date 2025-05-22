"use client";

import { useSendTransaction } from "@privy-io/react-auth";

export default function SendTransactionButton() {
    const {sendTransaction} = useSendTransaction();

    const onSendTransaction = async () => {
        sendTransaction({
            to: "0xE3070d3e4309afA3bC9a6b057685743CF42da77C",
            value: 100000
        });
    };

    return <button onClick={onSendTransaction}>Send Transaction</button>;
}