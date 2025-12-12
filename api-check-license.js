// --- SECURE BACKEND CODE (PRIVATE) ---

// In a real application, this list would be stored in a secure database.
// For demonstration, we hardcode the secret keys here.
const SECURE_MASTER_KEYS = [
    "A8B4C2D1E5F9G3H7J0K6L4M8",
    "P1Q2R3S4T5U6V7W8X9Y0Z1A2",
    "G9H8I7J6K5L4M3N2O1P0Q9R8"
    // Add your real master keys here.
];

// Default expiration is 1 year (365 days) from activation if key is valid.
const DEFAULT_ACTIVATION_DAYS = 365; 

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ success: false, message: "Method not allowed." });
    }

    const { key, deviceId, currentTimestamp } = request.body;

    if (!key || !deviceId || !currentTimestamp) {
        return response.status(400).json({ success: false, message: "Missing required parameters." });
    }

    const uppercaseKey = key.toUpperCase().trim();
    
    // --- STEP 1: Check against the secure master list ---
    if (!SECURE_MASTER_KEYS.includes(uppercaseKey)) {
        return response.status(200).json({ success: false, message: "Invalid license key. Check master list." });
    }
    
    // --- STEP 2: Check for existing activation/expiration (Simulated Database Check) ---
    
    // In a real app, you would look up the key in your private database here.
    // For this simulation, we assume any key in the SECURE_MASTER_KEYS list is VALID
    // and ready for activation or already active.
    
    // If the key is found, calculate the expiration date
    const expirationDate = new Date(currentTimestamp + (DEFAULT_ACTIVATION_DAYS * 24 * 60 * 60 * 1000));
    
    // Log the successful activation attempt privately (only visible on your server logs)
    console.log(`[SECURE LOG] Key ${uppercaseKey} validated for Device ${deviceId}. Expiration: ${expirationDate.toISOString()}`);


    // --- STEP 3: Return success (The key is now activated/verified) ---
    return response.status(200).json({
        success: true,
        message: "License verified and activated.",
        licenseData: {
            // The client needs the deviceId back to confirm it was activated for the right device
            deviceId: deviceId, 
            activationDate: currentTimestamp,
            expirationDate: expirationDate.getTime()
        }
    });
}
