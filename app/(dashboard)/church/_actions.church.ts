"use server";

import { query } from "@/app/_axios";
import { ChurchServices } from "./_services.church";
import { MembershipformSchemaType } from "./_components/membership-form";
import { FailedCreateMemberType } from "../_types";
import { isNativeError } from "util/types";
import { MemberTitle } from "./_components/member-title";

export const churchCreateMember = async (data: MembershipformSchemaType) => {
  try {
    const response = await query<FailedCreateMemberType>(
      ChurchServices.CreateMember(data)
    );
    if (response.hasOwnProperty("errors")) {
      // let's destructure the error and return them as an array of their messages
      // [error1, error2, error3]
      const details = response.errors.detail;
      return {
        success: false,
        message: response.message,
        data: Object.values(details).flat(),
      };
    }
    if (response.status_code === 200) {
      return {
        success: true,
        message: response.message,
        data: response.data,
      };
    }
  } catch (error) {
    if (isNativeError(error)) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
export const churchUpdateMember = async (
  id: string,
  data: Partial<MembershipformSchemaType>
) => {
  try {
    const response = await query<FailedCreateMemberType>(
      ChurchServices.UpdateMember(id, data)
    );
    if (response.hasOwnProperty("errors")) {
      // let's destructure the error and return them as an array of their messages
      // [error1, error2, error3]
      const details = response.errors.detail;
      return {
        success: false,
        message: response.message,
        data: Object.values(details).flat(),
      };
    }
    if (response.status_code === 200) {
      return {
        success: true,
        message: response.message,
        data: response.data,
      };
    }
  } catch (error) {
    if (isNativeError(error)) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
export const churchDeleteMember = async (id: string) => {
  try {
    const response = await query<FailedCreateMemberType>(
      ChurchServices.DeleteMember(id)
    );
    if (response.status_code === 200) {
      return {
        success: true,
        message: response.message,
      };
    }
    if (response.hasOwnProperty("error")) {
      const message = response.error as string;
      return {
        success: false,
        message,
      };
    }
  } catch (error) {
    if (isNativeError(error)) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

export const churchCreateMemberTitle = async (data: MemberTitle) => {
  try {
    const response = await query<FailedCreateMemberType>(
      ChurchServices.CreateMemberTitle(data)
    );
    if (response.status_code === 200) {
      return {
        success: true,
        message: response.message,
        // data: response.data ,
      };
    }
    if (response.hasOwnProperty("errors")) {
      const errors = response.errors.detail;
      return {
        success: false,
        message: response.message,
        data: Object.values(errors).flat(),
      };
    }
  } catch (error) {
    if (isNativeError(error)) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
