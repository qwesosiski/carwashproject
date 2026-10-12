import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import './MapSection.css';

// Координаты Сургута [citation:7][citation:14]
const SURGUT_CENTER = { lat: 61.2419, lng: 73.3953 };

// Адрес автомойки в Сургуте (пример — ул. Проспект Мира, 56) [citation:1]
const WASH_LOCATION = { lat: 61.2500, lng: 73.4000 };

const containerStyle = {
  width: '100%',
  height: '450px',
  borderRadius: '20px',
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0c4a6e' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
    { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#334155' }] },
  ],
};

const MapSection = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'ru', // Русский язык интерфейса
  });

  const [map, setMap] = useState(null);
  const [showInfo, setShowInfo] = useState(true);

  const onLoad = useCallback((mapInstance) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(SURGUT_CENTER);
    bounds.extend(WASH_LOCATION);
    mapInstance.fitBounds(bounds);
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <section id="map" className="map-section">
        <div className="container">
          <h2 className="section-title">Как нас найти</h2>
          <div className="map-error">
            Не удалось загрузить карту. Проверьте API-ключ Google Maps.
          </div>
        </div>
      </section>
    );
  }

  if (!isLoaded) {
    return (
      <section id="map" className="map-section">
        <div className="container">
          <h2 className="section-title">Как нас найти</h2>
          <div className="map-loading">Загрузка карты...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="map" className="map-section">
      <div className="container">
        <h2 className="section-title">Как нас найти</h2>
        <p className="section-subtitle">
          Мы находимся в центре Сургута — удобный подъезд и парковка
        </p>

        <div className="map-wrapper">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={SURGUT_CENTER}
            zoom={13}
            options={mapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              position={WASH_LOCATION}
              title="AquaShine — Автомойка"
              onClick={() => setShowInfo(true)}
            />
            {showInfo && (
              <InfoWindow
                position={WASH_LOCATION}
                onCloseClick={() => setShowInfo(false)}
              >
                <div style={{ color: '#0f172a', padding: '4px 8px' }}>
                  <strong>💦 AquaShine</strong>
                  <br />
                  г. Сургут, пр. Мира, 56
                  <br />
                  📞 +7 (999) 123-45-67
                </div>
              </InfoWindow>
            )}
          </GoogleMap>

          <div className="map-info-card">
            <h3>AquaShine в Сургуте</h3>
            <div className="map-info-row">
              <span>📍</span>
              <div>
                <strong>Адрес</strong>
                <p>г. Сургут, пр. Мира, 56</p>
              </div>
            </div>
            <div className="map-info-row">
              <span>🕐</span>
              <div>
                <strong>Режим работы</strong>
                <p>Круглосуточно, 7 дней в неделю</p>
              </div>
            </div>
            <div className="map-info-row">
              <span>📞</span>
              <div>
                <strong>Телефон</strong>
                <p>+7 (999) 123-45-67</p>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${WASH_LOCATION.lat},${WASH_LOCATION.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary map-route-btn"
            >
              Построить маршрут
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;