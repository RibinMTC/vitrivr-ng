/**
 * Defines the different types of messages used in exchange with Cineast. This only concerns the WebSocket API!
 */
export type MessageType =
    'INIT'
    | 'PING'
    | 'Q_SIM'
    | 'Q_SSIM'
    | 'Q_MLT'
    | 'Q_NESEG'
    | 'Q_SEG'
    | 'QR_START'
    | 'QR_END'
    | 'QR_ERROR'
    | 'QR_SIMILARITY'
    | 'QR_OBJECT'
    | 'QR_SEGMENT'
    | 'QR_METADATA_O'
    | 'QR_METADATA_S'
    | 'M_LOOKUP';
