import {SignupFormData} from "./pages/SignUp";
import {SigninFormData} from "./pages/SignIn";
import {HotelSearchResponse, HotelType} from "../../backend/shared/types";

export const signup = async (formData: SignupFormData) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error(err);
    throw new (Error as any)(err);
  }
};

export const signin = async (formData: SigninFormData) => {
  try {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error(err);
    throw new (Error as any)(err);
  }
};

export const validateToken = async () => {
  const res = await fetch("/api/auth/validate-token", {
    credentials: "include",
  });
  const data = await res.json();
  if (data.success === false) {
    throw new Error("Token invalid");
  }
  return data;
};

export const signout = async () => {
  try {
    const res = await fetch("/api/auth/signout", {
      credentials: "include",
    });
    const data = await res.json();
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error(err);
    throw new (Error as any)(err);
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  try {
    const res = await fetch("/api/my-hotels", {
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });
    const data = await res.json();
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw new (Error as any)(err);
  }
};

export const fetchMyhotels = async (): Promise<HotelType[]> => {
  const res = await fetch("/api/my-hotels", {
    credentials: "include",
  });
  try {
    const data = await res.json();
    if (data.success === false) {
      throw new Error("Error fetching hotels");
    }
    return data;
  } catch (err) {
    throw new (Error as any)(err);
  }
};

export const fetchMyhotelById = async (hotelId: string): Promise<HotelType> => {
  const res = await fetch(`/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  try {
    const data = await res.json();
    if (data.success === false) {
      throw new Error("Error fetching hotel");
    }
    return data;
  } catch (err) {
    throw new (Error as any)(err);
  }
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  try {
    const res = await fetch(`/api/my-hotels/${hotelFormData.get("hotelId")}`, {
      method: "PUT",
      credentials: "include",
      body: hotelFormData,
    });
    const data = await res.json();
    if (data.success === false) {
      throw new Error("Failed to update hotel");
    }
    return data;
  } catch (error) {
    throw new (Error as any)("Failed to update hotel");
  }
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const res = await fetch(`/api/hotels/search?${queryParams}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (data.success === false) {
    throw new Error("Error fetching hotels");
  }
  return data;
};
