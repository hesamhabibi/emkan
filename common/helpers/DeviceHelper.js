const DeviceDetector = require("device-detector-js");

const user_agent = async (req) => {
    try {
        return req.headers['user-agent'];
    } catch {
        return '';
    }
};

const device_info = async (req) => {
    let userAgent;
    if (typeof req === 'string')
        userAgent = req;
    else
        userAgent = await user_agent(req);

    const deviceDetector = new DeviceDetector();
    return deviceDetector.parse(userAgent);
};

const device_type = async (req) => {
    try {
        const { type } = (await device_info(req)).device;
        if (type === 'desktop')
            return 'desktop';
        if (type === 'smartphone')
            return 'mobile';

        return 'desktop'; // default value
    } catch {
        return 'desktop'; // default value
    }
};

module.exports = {
    user_agent,
    device_info,
    device_type,
};