import { BlueSnapDirectCallbackResults, BlueSnapDirectHostedPaymentFieldsOptions } from '../types';

const data = {
    cardData: {
        binCategory: 'CONSUMER',
        cardCategory: 'foo',
        cardSubType: 'CREDIT',
        ccBin: '411111',
        ccType: 'VISA',
        exp: '12/2023',
        isRegulatedCard: 'Y',
        issuingCountry: 'us',
        last4Digits: '1111',
    },
    statusCode: '1',
    transactionFraudInfo: {
        fraudSessionId: 'qwerty123',
    },
};

const errors = {
    '0': {
        error: [
            {
                errorCode: '0',
                errorDescription: 'unknown',
                eventType: 'Server Error',
                tagId: 'cvv',
            },
        ],
        statusCode: '0',
        transactionFraudInfo: {
            fraudSessionId: 'qwerty123',
        },
    },
    '14101': {
        error: [
            {
                errorCode: '14101',
                errorDescription: '3D Secure authentication failed',
                eventType: 'Server Error',
                tagId: 'ccn',
            },
        ],
        statusCode: '14101',
        transactionFraudInfo: {
            fraudSessionId: 'qwerty123',
        },
    },
};

export default function getBlueSnapDirectSdkMock(errorCode?: keyof typeof errors) {
    return {
        sdk: {
            hostedPaymentFieldsCreate: jest.fn(
                (options: BlueSnapDirectHostedPaymentFieldsOptions) => {
                    options.onFieldEventHandler?.setupComplete?.();
                },
            ),
            hostedPaymentFieldsSubmitData: jest.fn(
                (callback: (results: BlueSnapDirectCallbackResults) => void) =>
                    callback(errorCode ? errors[errorCode] : data),
            ),
        },
        callbackResults: errorCode ? errors[errorCode].error : data.cardData,
    };
}
