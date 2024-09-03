import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import  uploadImageToCloudinary  from '../../utils/uploadCloudinary'
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";


const Profile = ({doctorData}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: null,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
  setFormData(
    {
      name: doctorData?.name,
      email: doctorData?.email,
      password: doctorData?.password,
      phone: doctorData?.phone,
      address: doctorData?.address,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?. about,
      photo: doctorData?.photo,
    }
  )
}, [])
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async event => {
    const file = event.target.files[0]
    const data = await uploadImageToCloudinary(file)
    console.log(data)

    setFormData({...formData, photo:data?.url})

  };

  const updateProfileHandler = async e => {
    e.preventDefault();

    try{
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
        method: 'PUT',
        headers:{
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const result = await res.json();
      if(!res.ok){
        throw Error()
      }

      toast.success(result.message)
    }catch(err){
      toast.error(err.message)
    } 
 
  };

  const addItem = (key, newItem) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], newItem],
    }));
  };

  const handleReusableInputChangeFunc = (key, index, event) => {
    const {name, value} = event.target

    setFormData(prevFormData => {
      const updateItems = [...prevFormData[key]]

      updateItems[index][name] = value

      return {
        ...prevFormData,
        [key]: updateItems
      }
    })
  }

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", { startingDate: "", endingDate: "", degree: "", university: "" });
  };

  const handleQualificationChange = (index, e) => {
    handleReusableInputChangeFunc('qualifications', index, e)
  };



  const deleteQualification = (index, e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      qualifications: prevFormData.qualifications.filter((_, i) => i !== index),
    }));
  };

  const addExperience = e => {
    e.preventDefault();
    addItem("experiences", { startingDate: "", endingDate: "", position: "", hospital: "" });
  }

  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event)
  }

  const deleteExperiences = (e, index) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      experiences: prevFormData.experiences.filter((_, i) => i !== index),
    }));
  };

  const addTimeSlot = e => {
    e.preventDefault();
    addItem("timeSlots", { day: "", startingTime: "10:00 AM", endingTime: "04:30 PM" });
  }

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event)
  }

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeSlots: prevFormData.timeSlots.filter((_, i) => i !== index),
    }));
  };
  

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">Profile Information</h2>
      <form onSubmit={updateProfileHandler}>
        <div className="mb-5">
          <p className="form__label">Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Phone</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number"
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Address</p>
          <input
            type="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Bio</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
            maxLength={500}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender</p>
              <select name="gender" value={formData.gender} onChange={handleInputChange}
              className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <p className="text">Specialization</p>
              <select name="gender" value={formData.specialization} onChange={handleInputChange}
              className="form__input py-3.5">
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="psychatrist">Psychatrist</option>
                <option value="dentist">Dentist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="ophthalmologist">Ophthalmologist</option>
                <option value="endocrinologist">Endocrinologist</option> 
              </select>
            </div>

            <div>
              <p className="form__label">Ticket Price</p>
              <input type="number" placeholder="100" name="ticketPrice" value={formData.ticketPrice} className="form__input"
              onChange={handleInputChange}/>
            </div>
          </div>
        </div>

        {/* Qualification Section */}
        <div className="mb-5">
          <p className="form__label">Qualification</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form__label">Starting Date</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    onChange={(e) => handleQualificationChange(index, e)}
                    className="form__input"
                  />
                </div>
                <div>
                  <p className="form__label">Ending Date</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    onChange={(e) => handleQualificationChange(index, e)}
                    className="form__input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form__label">Degree</p>
                  <input
                    type="text"
                    name="degree"
                    value={item.degree}
                    onChange={(e) => handleQualificationChange(index, e)}
                    placeholder="Degree"
                    className="form__input"
                  />
                </div>
                <div>
                  <p className="form__label">University</p>
                  <input
                    type="text"
                    name="university"
                    value={item.university}
                    placeholder="University"
                    className="form__input"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={ e => deleteQualification(index, e)}
                className="bg-red-600 p-2 rounded-full text-white text-[16px] mt-2 mb-[30px] cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button onClick={addQualification} className="bg-[#000] py-2 px-5 rounded text-white h-fit">
            Add Qualification
          </button>
        </div>

        {/* experience */}
        <div className="mb-5">
          <p className="form__label">Experiences</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form__label">Starting Date</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="form__input"
                  />
                </div>
                <div>
                  <p className="form__label">Ending Date</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    onChange={(e) => handleExperienceChange(e, index)}
                    className="form__input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form__label">Position</p>
                  <input
                    type="text"
                    name="position"
                    value={item.position}
                    onChange={(e) => handleExperienceChange(e, index)}
                    placeholder="Position"
                    className="form__input"
                  />
                </div>
                <div>
                  <p className="form__label">Hospital</p>
                  <input
                    type="text"
                    name="hospital"
                    value={item.hospital}
                    placeholder="Hospital"
                    className="form__input"
                    onChange={(e) => handleExperienceChange(e, index)}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={ e => deleteExperiences(e, index)}
                className="bg-red-600 p-2 rounded-full text-white text-[16px] mt-2 mb-[30px] cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button onClick={addExperience} className="bg-[#000] py-2 px-5 rounded text-white h-fit">
            Add Experience
          </button>
        </div>

          {/* experience */}
        <div className="mb-5">
          <p className="form__label">Time Slots</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                <div>
                  <p className="form__label">Day</p>
                  <select name="day" value={item.day} className="form__input py-3.5">
                    <option value="">Select</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>
                <div>
                  <p className="form__label">Starting Time</p>
                  <input
                    type="time"
                    name="startingTime"
                    value={item.startingTime}
                    onChange={(e) => handleTimeSlotChange(e, index)}
                    className="form__input"
                  />
                </div>

                <div>
                  <p className="form__label">Ending Time</p>
                  <input
                    type="time"
                    name="endingTime"
                    value={item.endingTime}
                    onChange={(e) => handleTimeSlotChange(e, index)}
                    className="form__input"
                  />
                </div>

                <div className="flex items-center">
                <button
                type="button"
                onClick={ e => deleteTimeSlot(e, index)}
                className="bg-red-600 p-2 rounded-full text-white text-[16px] mt-2 cursor-pointer mt-6"
              >
                <AiOutlineDelete />
              </button>
                </div>
              </div>

            </div>
          ))}
          <button onClick={addTimeSlot} className="bg-[#000] py-2 px-5 rounded text-white h-fit">
            Add Timeslot
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">About</p>
          <textarea name="about" rows= {5} value={ formData.about } placeholder="Write about you" 
          onChange={handleInputChange} className="form__input"></textarea>
        </div>

        {/* Photo Upload */}
        <div className="mb-5 flex items-center gap-3">
        { formData.photo && (<figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
              <img src= {formData.photo} alt="" className='w-full rounded-full'/>
              </figure>)}

              <div className='relative w-[130px] h-[50px]'>
                <input 
                  type="file"
                  name='photo'
                  id='customFile'
                  onChange={handleFileInputChange}
                  accept='.jpg, .png'
                  className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                />

                <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden
                 bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
                  Upload Photo
                 </label>
              </div>
        </div>

        <div className="mt-2">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[16px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;