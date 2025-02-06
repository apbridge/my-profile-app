import { useState } from "react";
import style from "../styles/ProfileForm.module.css";

const ProfileForm = () => {
    const [data, setData] = useState({ name: "", title: "", email: "", bio: "", image: null });
    const [errors, setErrors] = useState({ image: "", general: "" });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 2000000) {
                    setErrors({ ...errors, image: "Image must be less than 2MB." });
                } else {
                    setErrors({ ...errors, image: "" }); // Clear previous error
                    setData({ ...data, image: file });
                }
            }
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append("name", data.name.trim());
        formData.append("email", data.email.trim());
        formData.append("title", data.title.trim());
        formData.append("bio", data.bio.trim());
        if (data.image) formData.append("image", data.image);

        try {
            const response = await fetch("https://web.ics.purdue.edu/~apbridge/profile-app/send-data.php", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            console.log(result);
            if (result.success) {
                setData({ name: "", title: "", email: "", bio: "", image: null });
                setErrors({ image: "", general: "" });
                setSuccessMessage("Data submitted successfully.");
                document.getElementById("image").value = ""; // Clear file input
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            } else {
                setErrors({ image: "", general: result.message });
                setSuccessMessage("");
            }
        } catch (error) {
            setErrors({ image: "", general: error.message || "An error occurred." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style["profile-form"]}>
            <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                required 
                value={data.name} 
                onChange={handleChange}
            />
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                required 
                value={data.email} 
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                required 
                value={data.title} 
                onChange={handleChange}
            />
            <textarea 
                name="bio" 
                placeholder="Some description" 
                required 
                value={data.bio} 
                onChange={handleChange}
            ></textarea>
            <p>{data.bio?.length || 0}/200</p>
            <label htmlFor="image">Choose a profile picture:</label>
            <input type="file" id="image" name="image" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={handleChange} />
            {errors.image && <p>{errors.image}</p>}
            <button type="submit" disabled={submitting || errors.image !== "" || data.name.trim() === "" || data.email.trim() === "" || data.bio.trim() === "" || data.title.trim() === ""}>Submit</button>
            {errors.general && <p>{errors.general}</p>}
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
};

export default ProfileForm;
