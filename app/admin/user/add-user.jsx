"use client";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addUser, updateUser, fetchAllRoles } from "@/components/auth/admin-operation";
import toast from "react-hot-toast";
import ProfileImageUpload from "./file-uploader";
import axiosInstance from "@/config/axios.config";
import { SelectViewport } from "@radix-ui/react-select";
const furits = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};
export default function SubmitFormInSheet({ open, onClose, user = null, onUserUpdated }) {
  const isUpdateMode = !!user;
  const [file, setFile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: null,
    profileImage: null,
    profileImageUrl: "",
  });


  const [initialFormData, setInitialFormData] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  
  const loadRoles = async () => {
    try {
      const fetchedRoles = await fetchAllRoles();
      const formattedRoles = fetchedRoles?.roles.map((role) => ({
        value: role.id,
        label: role.name,
      }));
      setRoles(formattedRoles.filter(ele => ele.label !== 'Public'));
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  useEffect(() => {
    const setFormDataWithRoles = () => {
      if (isUpdateMode && roles.length > 0) {
        const userRole = roles.find((role) => role.value === user?.role?.id) || null;
        setFormData({
          username: user?.username || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          role: userRole,
          profileImage: user?.profileImage?.id || null,
          profileImageUrl: user?.profileImage?.url || "",
        });
  
        setInitialFormData({
          username: user?.username || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          role: userRole,
          profileImage: user?.profileImage?.id || null,
          profileImageUrl: user?.profileImage?.url || "",
        });
      }
    };
    loadRoles();
    setFormDataWithRoles();
  }, [user, isUpdateMode]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    checkChanges({ ...formData, [id]: value });
  };


  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, role: selectedOption });
    checkChanges({ ...formData, role: selectedOption });
  };
  

  const handleImageUpload = (image) => {
    setFile(image);
    checkChanges({ ...formData, profileImage: image });
  };

  const uploadFile = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("files", file);
    try {
      const { data } = await axiosInstance({
        url: "/api/upload/",
        method: "post",
        data: formData,
      });

      const fileId = data[0].id;
      return fileId;
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image.");
      return null;
    }
  };

  const validateForm = () => {
    const { username, firstName, email, password, role } = formData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!username || username.trim()==="" || !firstName || firstName.trim()==="" || !email || email.trim()==="" || !role) {
      toast.error("Please fill in all required fields: (*)");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!isUpdateMode && !password || !isUpdateMode && password.trim()==="") {
      toast.error("Password is required.");
      return false;
    }

    if (isUpdateMode) {
      if (!username.trim() || !firstName.trim() || !email.trim() || !role) {
        toast.error("No field can be empty.");
        return false;
      }
    }
    return true;
  };

  const checkChanges = (newFormData) => {
    if (!initialFormData) return;

    const hasChanges = Object.keys(newFormData).some(
      (key) => newFormData[key] !== initialFormData[key]
    );
    setIsSubmitDisabled(!hasChanges);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (file) {
      const fileId = await uploadFile(file);
      if (fileId) {
        formData.profileImage = fileId;
      }
    }
  
    const submissionData = {
      ...formData,
      role: {
        connect: [{ id: formData.role?.value }], 
        disconnect: isUpdateMode
          ? initialFormData.role && initialFormData.role.value !== formData.role?.value
            ? [{ id: initialFormData.role.value }] 
            : []
          : [], 
      },
    };
  
    try {
      if (isUpdateMode) {
        await updateUser(user.id, submissionData);
      } else {
        await addUser(submissionData);
      }
  
      setFormData({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: null,
        profileImage: null,
        profileImageUrl: "",
      });
  
      setFile(null); 
      onClose();
      onUserUpdated(); 
    } catch (error) {
      console.error(`${isUpdateMode ? "Failed to update" : "Failed to create"} user:`, error);
    }
  };
  

  const handleCancel = () => {
    setFormData({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: null,
      profileImage: null,
      profileImageUrl: "",
    });
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>{isUpdateMode ? "Update User" : "Add New User"}</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
            <div className="py-5">
              <p>
                <hr></hr>
              </p>
              <div className="md:grid md:grid-cols-2 gap-6 mt-6 space-y-6 md:space-y-0">
                
                <div className="flex flex-col gap-2">
                  <Label className="text-default-600" htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="text-md border-default-400 text-default-600"
                    placeholder="Please enter first name"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-default-600" htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    className="text-md border-default-400 text-default-600"
                    placeholder="Please enter last name"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-default-600" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    className="text-md border-default-400 text-default-600"
                    placeholder="Please enter email"
                    id="email"
                    required
                    readOnly={isUpdateMode}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-default-600" htmlFor="username">
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="text-md border-default-400 text-default-600"
                    placeholder="Please enter username"
                    id="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                {!isUpdateMode && (
                  <div className="flex flex-col gap-2">
                    <Label className="text-default-600" htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="password"
                      className="text-md border-default-400 text-default-600"
                      placeholder="Please enter password"
                      id="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Label className="text-default-600" htmlFor="role">
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    defaultValue={formData.role}
                    value={formData.role}
                    onChange={(selectedOption) => handleSelectChange(selectedOption)}
                    className="react-select text-md border-default-400 text-default-600"
                    classNamePrefix="select"
                    placeholder="Select a role"
                    styles={styles}
                    options={roles}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-default-600" htmlFor="profileImage">
                    Profile Image <span className="text-red-500"></span>
                  </Label>
                  <ProfileImageUpload onFileChange={handleImageUpload} initialImage={formData.profileImageUrl || ""} id="profileImage" />
                </div>
              </div>
            </div>

            <div className="space-x-4 rtl:space-x-reverse">
              <Button variant="outline" size="xs" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="xs" color="default" onClick={handleSubmit} disabled={isSubmitDisabled}>
                Submit
              </Button>
            </div>
          </div>
        </SheetDescription>
        <SheetFooter>
          <SheetClose asChild>Footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
