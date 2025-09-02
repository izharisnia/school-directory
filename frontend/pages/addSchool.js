import { useForm } from 'react-hook-form';
import { useState } from 'react';
import api from '../utils/api';

export default function AddSchool() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);

  const onSubmit = async (data) => {
    setOk(null);
    setLoading(true);
    try {
      const form = new FormData();
      for (const key of ['name','address','city','state','contact','email_id','board','hostel','type','medium']) {
        form.append(key, data[key]);
      }
      if (data.image?.[0]) form.append('image', data.image[0]);

      await api.post('/api/schools', form, { headers: { 'Content-Type': 'multipart/form-data' }});
      setOk('✅ School added successfully!');
      reset();
      setPreview(null);
    } catch (e) {
      setOk('❌ Failed to add school. Check server logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2 className="page-title">Add School</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-card">
        <div className="form-grid">

          <label>
            School Name
            <input {...register('name', { required: true, minLength: 2 })} placeholder="Green Valley Public School" />
            {errors.name && <span className="err">Name is required</span>}
          </label>

          <label>
            Address
            <input {...register('address', { required: true })} placeholder="123 Main Street" />
            {errors.address && <span className="err">Address is required</span>}
          </label>

          <label>
            City
            <input {...register('city', { required: true })} placeholder="Dehradun" />
            {errors.city && <span className="err">City is required</span>}
          </label>

          <label>
            State
            <input {...register('state', { required: true })} placeholder="Himachal Pradesh" />
            {errors.state && <span className="err">State is required</span>}
          </label>

          <label>
            Contact
            <input {...register('contact', { required: true, pattern: /^[0-9+\-\s]{7,15}$/ })} placeholder="+91 98765 43210" />
            {errors.contact && <span className="err">Enter a valid phone</span>}
          </label>

          <label>
            Email
            <input {...register('email_id', { required: true, pattern: /^\S+@\S+\.\S+$/ })} placeholder="info@school.edu" />
            {errors.email_id && <span className="err">Enter a valid email</span>}
          </label>

          <label>
            Board
            <select {...register('board', { required: true })} className="input">
              <option value="">Select Board</option>
              <option>CBSE</option>
              <option>ICSE</option>
              <option>State Board</option>
              <option>Other</option>
            </select>
            {errors.board && <span className="err">Board is required</span>}
          </label>

          <label>
            Hostel Facility
            <select {...register('hostel', { required: true })} className="input">
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
            {errors.hostel && <span className="err">Hostel info required</span>}
          </label>

          <label>
            Type
            <select {...register('type', { required: true })} className="input">
              <option value="">Select Type</option>
              <option>All Girls</option>
              <option>All Boys</option>
              <option>Co-education</option>
            </select>
            {errors.type && <span className="err">Type is required</span>}
          </label>

          <label>
            Medium
            <select {...register('medium', { required: true })} className="input">
              <option value="">Select Medium</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Regional Language</option>
              <option>Bilingual</option>
            </select>
            {errors.medium && <span className="err">Medium is required</span>}
          </label>

          <label className="full-width">
            Upload Image
            <input
              type="file"
              accept="image/*"
              {...register('image', { required: true })}
              onChange={(e)=>{ if (e.target.files[0]) setPreview(URL.createObjectURL(e.target.files[0])); }}
            />
            {errors.image && <span className="err">Image is required</span>}
          </label>
        </div>

        {preview && <img className="preview" src={preview} alt="preview" />}

        <button className="btn primary submit-btn" disabled={loading} type="submit">
          {loading ? 'Saving…' : 'Save School'}
        </button>

        {ok && <div className="note">{ok}</div>}
      </form>
    </div>
  );
}
