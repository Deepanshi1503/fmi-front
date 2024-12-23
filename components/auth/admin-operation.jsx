import toast from "react-hot-toast";
import axiosInstance from "@/config/axios.config";

const handleError = (error, message) => {
    console.error(message, error);
    toast.error(error?.response?.data?.error?.message || message);
    return null;
};

export const fetchAllUsers = async () => {

    try {
        const { data } = await axiosInstance({
            url: "/api/users?populate=*",
            method: "GET"
        })

        if (data.length === 0) {
            toast.success("No users available");
            return [];
        }
        return data.map((ele) => ({ ...ele, name: `${ele.firstName ? ele.firstName + ' ' + (ele.lastName || '') : ''}` }));
    } catch (error) {
        return handleError(error, "Failed to fetch users");
    }
};

export const fetchAllRoles = async () => {
    try {
        const { data } = await axiosInstance({
            url: "/api/users-permissions/roles",
            method: "GET",
        });

        if (data.length === 0) {
            toast.success("No roles available");
            return [];
        }

        return data
    } catch (error) {
        handleError(error, "Failed to fetch role");
        return [];
    }
};

export const addUser = async (userData) => {

    try {
        const { data } = await axiosInstance({
            url: `/api/users`,
            method: "POST",
            data: userData
        },)

        toast.success("User created successfully");
        return data;
    } catch (error) {
        return handleError(error, "Failed to create user");
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const { data: currentUser } = await axiosInstance({
            url: `/api/users/${userId}?populate=*`,
            method: "GET",
        });

        const currentUserData = {
            username: currentUser?.username || "",
            firstName: currentUser?.firstName || "",
            lastName: currentUser?.lastName || "",
            role: currentUser?.role?.id || null,
            profileImage: currentUser?.profileImage?.id || null,
        };

        const modifiedUserData = {
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName || null,
            role: userData.role?.connect?.[0]?.id || null,
            profileImage: userData.profileImage || null,
        };

        const hasChanges = Object.keys(modifiedUserData).some(
            (key) => modifiedUserData[key] !== currentUserData[key]
        );

        if (!hasChanges) {
            toast.error("No changes detected. Please modify the user data to update.");
            return false;
        }

        const roleDisconnect = currentUserData.role !== modifiedUserData.role
            ? [{ id: currentUserData.role }]
            : [];

        const submissionData = {
            ...modifiedUserData,
            role: {
                connect: modifiedUserData.role ? [{ id: modifiedUserData.role }] : [],
                disconnect: roleDisconnect,
            },
        };

        const { data } = await axiosInstance({
            url: `/api/users/${userId}`,
            method: "PUT",
            data: submissionData,
        });

        if (data) {
            toast.success("User updated successfully");
            return true;
        }
    } catch (error) {
        handleError(error, "Failed to update user");
        return false;
    }
};



export const blockUser = async (userId, isBlocked) => {

    try {
        const { data } = await axiosInstance({
            url: `/api/users/${userId}`,
            method: "PUT",
            data: { blocked: !isBlocked }
        },)

        toast.success(isBlocked ? "User unblocked successfully" : "User blocked successfully");
        return data;
    } catch (error) {
        return handleError(error, "failed to block user");
    }
};
