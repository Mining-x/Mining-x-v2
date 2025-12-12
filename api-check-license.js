exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Denied" };

    const { key } = JSON.parse(event.body);

    // --- ADD YOUR VALID 20-CHARACTER KEYS HERE ---
    const VALID_KEYS = [
        "MXPRO-9988-7766-5544",
        "GOLDX-1122-3344-5566",
        "TRIAL-0000-1111-2222",
        "72626-KJJH-725152HEY",
        "JSJ27JSYFE27854H6527",
        "2SJE2735HSUE720KSHEU",
        "KSY2735HSUS2735HSJEY"
    ];

    if (VALID_KEYS.includes(key)) {
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Key Accepted" })
        };
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({ success: false, message: "Invalid or Expired License" })
        };
    }
};
