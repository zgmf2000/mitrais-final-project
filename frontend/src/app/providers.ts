import { InjectionToken } from '@angular/core';

export const UtilityToken = new InjectionToken('UtilityToken');

export const UtilityList = {
    gender          : ['Male', 'Female', 'Other'],
    marital_status  : [ 'Single', 'Married', 'Widowed']
};