import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TravelGroup, CreateGroupData } from '../types';
import './TravelGroups.css';

const TravelGroups: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [groups, setGroups] = useState<TravelGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateGroupData>({
    name: '',
    description: '',
    destination: '',
    tripItineraryId: '',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadGroups();
  }, [isAuthenticated, navigate]);

  const loadGroups = async () => {
    setLoading(true);
    setError('');
    try {
      // TODO: Implement when backend endpoint is available
      // const data = await getTravelGroups();
      // setGroups(data);
      setGroups([]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load travel groups');
      console.error('Error loading travel groups:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // TODO: Implement when backend endpoint is available
      // const newGroup = await createTravelGroup(formData);
      // setGroups([...groups, newGroup]);
      // setShowCreateForm(false);
      // setFormData({ name: '', description: '', destination: '', tripItineraryId: '' });
      alert('Travel group creation feature coming soon!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create travel group');
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      // TODO: Implement when backend endpoint is available
      // await joinTravelGroup(groupId);
      // loadGroups();
      alert('Travel group join feature coming soon!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to join travel group');
    }
  };

  if (loading) {
    return <div className="travel-groups-loading">Loading travel groups...</div>;
  }

  return (
    <div className="travel-groups">
      <div className="travel-groups-container">
        <div className="travel-groups-header">
          <h1>Travel Groups</h1>
          <button onClick={() => setShowCreateForm(!showCreateForm)} className="create-button">
            {showCreateForm ? 'Cancel' : '+ Create Group'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showCreateForm && (
          <div className="create-group-form">
            <h2>Create Travel Group</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="form-group">
                <label>Group Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter group name"
                />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Enter group description"
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="Enter destination"
                />
              </div>
              <div className="form-group">
                <label>Trip Itinerary ID</label>
                <input
                  type="text"
                  value={formData.tripItineraryId}
                  onChange={(e) => setFormData({ ...formData, tripItineraryId: e.target.value })}
                  placeholder="Enter itinerary ID (optional)"
                />
              </div>
              <button type="submit" className="submit-button">
                Create Group
              </button>
            </form>
          </div>
        )}

        {groups.length === 0 ? (
          <div className="no-groups">
            <p>No travel groups found. Create one to get started!</p>
          </div>
        ) : (
          <div className="groups-grid">
            {groups.map((group) => (
              <div key={group._id} className="group-card">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                {group.destination && <p className="destination">📍 {group.destination}</p>}
                <p className="members">Members: {group.members.length}</p>
                <button onClick={() => handleJoinGroup(group._id)} className="join-button">
                  Join Group
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelGroups;
