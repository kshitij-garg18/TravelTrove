import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createItinerary } from '../services/itineraryService';
import { CreateItineraryData, Activity, LodgingInfo, DiningInfo } from '../types';
import './CreateItinerary.css';

const CreateItinerary: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<CreateItineraryData>({
    destination: '',
    duration: 1,
    activities: [{ name: '', description: '', date: '', time: '' }],
    lodging: [{ name: '', type: '', description: '', priceRange: '', address: '' }],
    dining: [{ name: '', cuisine: '', description: '', priceRange: '', address: '' }],
  });

  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (field: keyof CreateItineraryData, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleActivityChange = (index: number, field: keyof Activity, value: string) => {
    const activities = [...formData.activities];
    activities[index] = { ...activities[index], [field]: value };
    setFormData({ ...formData, activities });
  };

  const handleLodgingChange = (index: number, field: keyof LodgingInfo, value: string) => {
    const lodging = [...formData.lodging];
    lodging[index] = { ...lodging[index], [field]: value };
    setFormData({ ...formData, lodging });
  };

  const handleDiningChange = (index: number, field: keyof DiningInfo, value: string) => {
    const dining = [...formData.dining];
    dining[index] = { ...dining[index], [field]: value };
    setFormData({ ...formData, dining });
  };

  const addActivity = () => {
    setFormData({
      ...formData,
      activities: [...formData.activities, { name: '', description: '', date: '', time: '' }],
    });
  };

  const addLodging = () => {
    setFormData({
      ...formData,
      lodging: [...formData.lodging, { name: '', type: '', description: '', priceRange: '', address: '' }],
    });
  };

  const addDining = () => {
    setFormData({
      ...formData,
      dining: [...formData.dining, { name: '', cuisine: '', description: '', priceRange: '', address: '' }],
    });
  };

  const removeActivity = (index: number) => {
    const activities = formData.activities.filter((_, i) => i !== index);
    setFormData({ ...formData, activities });
  };

  const removeLodging = (index: number) => {
    const lodging = formData.lodging.filter((_, i) => i !== index);
    setFormData({ ...formData, lodging });
  };

  const removeDining = (index: number) => {
    const dining = formData.dining.filter((_, i) => i !== index);
    setFormData({ ...formData, dining });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const itinerary = await createItinerary(formData);
      navigate(`/trip-itineraries/${itinerary._id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create itinerary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-itinerary">
      <div className="create-itinerary-container">
        <h1>Create Trip Itinerary</h1>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label>Destination *</label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => handleChange('destination', e.target.value)}
                required
                placeholder="Enter destination"
              />
            </div>
            <div className="form-group">
              <label>Duration (days) *</label>
              <input
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h2>Activities</h2>
              <button type="button" onClick={addActivity} className="add-button">
                + Add Activity
              </button>
            </div>
            {formData.activities.map((activity, index) => (
              <div key={index} className="item-card">
                <input
                  type="text"
                  placeholder="Activity name"
                  value={activity.name}
                  onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={activity.description}
                  onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                  required
                  rows={3}
                />
                <div className="row-inputs">
                  <input
                    type="date"
                    placeholder="Date"
                    value={activity.date}
                    onChange={(e) => handleActivityChange(index, 'date', e.target.value)}
                  />
                  <input
                    type="time"
                    placeholder="Time"
                    value={activity.time}
                    onChange={(e) => handleActivityChange(index, 'time', e.target.value)}
                  />
                </div>
                {formData.activities.length > 1 && (
                  <button type="button" onClick={() => removeActivity(index)} className="remove-button">
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h2>Lodging Recommendations</h2>
              <button type="button" onClick={addLodging} className="add-button">
                + Add Lodging
              </button>
            </div>
            {formData.lodging.map((lodging, index) => (
              <div key={index} className="item-card">
                <input
                  type="text"
                  placeholder="Lodging name"
                  value={lodging.name}
                  onChange={(e) => handleLodgingChange(index, 'name', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Type (Hotel, Hostel, Airbnb, etc.)"
                  value={lodging.type}
                  onChange={(e) => handleLodgingChange(index, 'type', e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={lodging.description}
                  onChange={(e) => handleLodgingChange(index, 'description', e.target.value)}
                  required
                  rows={3}
                />
                <div className="row-inputs">
                  <input
                    type="text"
                    placeholder="Price range"
                    value={lodging.priceRange}
                    onChange={(e) => handleLodgingChange(index, 'priceRange', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={lodging.address}
                    onChange={(e) => handleLodgingChange(index, 'address', e.target.value)}
                  />
                </div>
                {formData.lodging.length > 1 && (
                  <button type="button" onClick={() => removeLodging(index)} className="remove-button">
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h2>Dining Recommendations</h2>
              <button type="button" onClick={addDining} className="add-button">
                + Add Dining
              </button>
            </div>
            {formData.dining.map((dining, index) => (
              <div key={index} className="item-card">
                <input
                  type="text"
                  placeholder="Restaurant name"
                  value={dining.name}
                  onChange={(e) => handleDiningChange(index, 'name', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Cuisine type"
                  value={dining.cuisine}
                  onChange={(e) => handleDiningChange(index, 'cuisine', e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={dining.description}
                  onChange={(e) => handleDiningChange(index, 'description', e.target.value)}
                  required
                  rows={3}
                />
                <div className="row-inputs">
                  <input
                    type="text"
                    placeholder="Price range"
                    value={dining.priceRange}
                    onChange={(e) => handleDiningChange(index, 'priceRange', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={dining.address}
                    onChange={(e) => handleDiningChange(index, 'address', e.target.value)}
                  />
                </div>
                {formData.dining.length > 1 && (
                  <button type="button" onClick={() => removeDining(index)} className="remove-button">
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Creating...' : 'Create Itinerary'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItinerary;
