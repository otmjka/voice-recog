import type { AddMemoFormValue } from '@/types';

export type FetchParams = {
  offset: number;
  size: number;
};

class LocalDbService {
  private dbName: string = 'MemoDB';
  private storeName: string = 'memos';
  private dbPromise: Promise<IDBDatabase> | null = null;

  constructor(dbName?: string, storeName?: string) {
    // Позволяем переопределять имена для тестирования
    this.dbName = dbName || this.dbName;
    this.storeName = storeName || this.storeName;
  }

  private async initDB(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(this.storeName, { keyPath: 'id' });
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return this.dbPromise;
  }

  async addMemo(memo: AddMemoFormValue) {
    const db = await this.initDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    const request = store.add(memo);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve({});
      request.onerror = () => reject(request.error);
    });
  }

  async getMemos(
    params: FetchParams,
    callback: (items: AddMemoFormValue[]) => void,
  ): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const items = request.result as AddMemoFormValue[];
        const paginatedItems = items.slice(
          params.offset,
          params.offset + params.size,
        );
        callback(paginatedItems);
      };

      request.onerror = () => {
        throw request.error;
      };
    } catch (error) {
      console.error('Error fetching memos:', error);
      callback([]);
    }
  }
}

export const localDbService = new LocalDbService();
