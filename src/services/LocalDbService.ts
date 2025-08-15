import type { MemoRecord } from '@/types';

export type FetchParams = {
  offset: number;
  size: number;
};

export class LocalDbService {
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

  async addMemo(
    memo: MemoRecord,
  ): Promise<{ result?: boolean; error?: unknown }> {
    const db = await this.initDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    store.put(memo);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve({ result: true });
      transaction.onerror = () => reject({ error: transaction.error });
    });
  }

  async getMemosPromise(): Promise<{ result?: MemoRecord[]; error?: unknown }> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const items = (request.result as MemoRecord[]).sort(
            (a, b) => Number(b.id) - Number(a.id),
          );
          resolve({ result: items });
        };

        request.onerror = () => {
          reject({ error: request.error });
        };
      });
    } catch (error) {
      console.error('Error fetching memos:', error);
      return { error };
    }
  }

  async deleteMemo(id: string): Promise<{ result?: boolean; error?: unknown }> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve({ result: true });
        request.onerror = () => reject({ error: transaction.error });
      });
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
}

export const localDbService = new LocalDbService();
