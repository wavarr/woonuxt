<style scoped>
.debug-panel {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-family: monospace;
  font-size: 12px;
  z-index: 9999;
  border-top-left-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.debug-header {
  padding: 8px 12px;
  background: #333;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-top-left-radius: 8px;
}

.debug-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
}

.debug-section {
  margin-bottom: 12px;
  border-bottom: 1px solid #444;
  padding-bottom: 8px;
}

.debug-section h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #3498db;
}

.debug-button {
  background: #2980b9;
  border: none;
  color: white;
  padding: 4px 8px;
  margin: 4px 4px 4px 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
}

.debug-button:hover {
  background: #3498db;
}

.debug-console {
  background: #111;
  padding: 8px;
  max-height: 150px;
  overflow-y: auto;
  border-radius: 4px;
}

.debug-console .log {
  color: #ddd;
}

.debug-console .warn {
  color: #f39c12;
}

.debug-console .error {
  color: #e74c3c;
}
</style> 
