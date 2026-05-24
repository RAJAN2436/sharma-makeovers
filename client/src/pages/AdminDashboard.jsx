import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { api } from '../api/api';
import './Admin.css';

const emptyService = {
  title: '',
  description: '',
  price: 'On request',
  image: '',
  category: 'General',
  featured: false,
  order: 0,
};

const emptyGallery = { title: '', image: '', category: 'Makeover', order: 0 };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('settings');
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [message, setMessage] = useState('');
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [galleryForm, setGalleryForm] = useState(emptyGallery);
  const [editingService, setEditingService] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }
    // Verify token with server — rejects fake/expired tokens
    verifyAndLoad();
  }, [navigate]);

  const verifyAndLoad = async () => {
    try {
      await api.verifyToken();
      loadData();
    } catch {
      // Server rejected the token
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/admin', { replace: true });
    }
  };

  const loadData = async () => {
    try {
      const [s, sv, g] = await Promise.all([
        api.getSettings(),
        api.getServices(),
        api.getGallery(),
      ]);
      setSettings(s);
      setServices(sv);
      setGallery(g);
    } catch {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/admin', { replace: true });
    }
  };

  const showMsg = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    try {
      const updated = await api.updateSettings(settings);
      setSettings(updated);
      showMsg('Settings saved!');
    } catch (err) {
      showMsg(err.message);
    }
  };

  const saveService = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await api.updateService(editingService, serviceForm);
        showMsg('Service updated!');
      } else {
        await api.createService(serviceForm);
        showMsg('Service added!');
      }
      setServiceForm(emptyService);
      setEditingService(null);
      loadData();
    } catch (err) {
      showMsg(err.message);
    }
  };

  const saveGallery = async (e) => {
    e.preventDefault();
    try {
      if (editingGallery) {
        await api.updateGallery(editingGallery, galleryForm);
        showMsg('Gallery item updated!');
      } else {
        await api.createGallery(galleryForm);
        showMsg('Gallery item added!');
      }
      setGalleryForm(emptyGallery);
      setEditingGallery(null);
      loadData();
    } catch (err) {
      showMsg(err.message);
    }
  };

  const deleteService = async (id) => {
    if (!confirm('Delete this service?')) return;
    await api.deleteService(id);
    showMsg('Service deleted');
    loadData();
  };

  const deleteGalleryItem = async (id) => {
    if (!confirm('Delete this gallery item?')) return;
    await api.deleteGallery(id);
    showMsg('Gallery item deleted');
    loadData();
  };

  const editService = (s) => {
    setServiceForm({
      title: s.title,
      description: s.description,
      price: s.price,
      image: s.image,
      category: s.category,
      featured: s.featured,
      order: s.order,
    });
    setEditingService(s._id);
    setTab('services');
  };

  const editGalleryItem = (g) => {
    setGalleryForm({
      title: g.title,
      image: g.image,
      category: g.category,
      order: g.order,
    });
    setEditingGallery(g._id);
    setTab('gallery');
  };

  if (!settings) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar slide-in-left">
        <Logo size="sm" />
        <p className="admin-sidebar__user">Hi, {adminUser.name || 'Admin'}</p>
        <nav>
          {['settings', 'services', 'gallery'].map((t) => (
            <button
              key={t}
              className={tab === t ? 'active' : ''}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
        <Link to="/" className="admin-sidebar__link">
          View Website
        </Link>
        <button onClick={handleLogout} className="admin-sidebar__logout">
          Logout
        </button>
      </aside>

      <main className="admin-main slide-in-right">
        {message && <div className="admin-toast">{message}</div>}
        <h1>Manage Website</h1>

        {tab === 'settings' && (
          <form onSubmit={saveSettings} className="admin-panel">
            <h2>Site Settings</h2>
            <div className="admin-grid">
              <label>
                Business Name
                <input
                  value={settings.businessName}
                  onChange={(e) =>
                    setSettings({ ...settings, businessName: e.target.value })
                  }
                />
              </label>
              <label>
                Tagline
                <input
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                />
              </label>
              <label className="full">
                Address
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows={2}
                />
              </label>
              <label>
                Phone
                <input
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                />
              </label>
              <label>
                Email
                <input
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </label>
              <label>
                Instagram Username
                <input
                  value={settings.instagram}
                  onChange={(e) =>
                    setSettings({ ...settings, instagram: e.target.value })
                  }
                />
              </label>
              <label className="full">
                About Text
                <textarea
                  value={settings.aboutText}
                  onChange={(e) =>
                    setSettings({ ...settings, aboutText: e.target.value })
                  }
                  rows={4}
                />
              </label>
              <label className="full">
                Hero Slide Images (one URL per line)
                <textarea
                  value={(settings.heroImages || []).join('\n')}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      heroImages: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  rows={4}
                  placeholder="https://example.com/image1.jpg"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Save Settings
            </button>
          </form>
        )}

        {tab === 'services' && (
          <div className="admin-panel">
            <h2>{editingService ? 'Edit Service' : 'Add Service'}</h2>
            <form onSubmit={saveService} className="admin-grid">
              <label>
                Title
                <input
                  value={serviceForm.title}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, title: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Category
                <input
                  value={serviceForm.category}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, category: e.target.value })
                  }
                />
              </label>
              <label>
                Price
                <input
                  value={serviceForm.price}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, price: e.target.value })
                  }
                />
              </label>
              <label>
                Image URL
                <input
                  value={serviceForm.image}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, image: e.target.value })
                  }
                />
              </label>
              <label className="full">
                Description
                <textarea
                  value={serviceForm.description}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, description: e.target.value })
                  }
                  required
                  rows={3}
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={serviceForm.featured}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, featured: e.target.checked })
                  }
                />{' '}
                Featured
              </label>
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingService ? 'Update' : 'Add'} Service
                </button>
                {editingService && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setEditingService(null);
                      setServiceForm(emptyService);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            <h3>All Services ({services.length})</h3>
            <ul className="admin-list">
              {services.map((s) => (
                <li key={s._id}>
                  <img src={s.image} alt="" />
                  <div>
                    <strong>{s.title}</strong>
                    <span>{s.category}</span>
                  </div>
                  <div>
                    <button onClick={() => editService(s)}>Edit</button>
                    <button onClick={() => deleteService(s._id)} className="danger">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'gallery' && (
          <div className="admin-panel">
            <h2>{editingGallery ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
            <form onSubmit={saveGallery} className="admin-grid">
              <label>
                Title
                <input
                  value={galleryForm.title}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, title: e.target.value })
                  }
                />
              </label>
              <label>
                Category
                <input
                  value={galleryForm.category}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, category: e.target.value })
                  }
                />
              </label>
              <label className="full">
                Image URL
                <input
                  value={galleryForm.image}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, image: e.target.value })
                  }
                  required
                />
              </label>
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingGallery ? 'Update' : 'Add'} Item
                </button>
                {editingGallery && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setEditingGallery(null);
                      setGalleryForm(emptyGallery);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            <h3>Gallery ({gallery.length})</h3>
            <ul className="admin-list admin-list--gallery">
              {gallery.map((g) => (
                <li key={g._id}>
                  <img src={g.image} alt="" />
                  <div>
                    <strong>{g.title || 'Untitled'}</strong>
                  </div>
                  <div>
                    <button onClick={() => editGalleryItem(g)}>Edit</button>
                    <button onClick={() => deleteGalleryItem(g._id)} className="danger">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
