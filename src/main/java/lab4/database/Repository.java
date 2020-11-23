package lab4.database;

import java.util.List;

public interface Repository<Entry> {
    void clear();

    void save(Entry entry);

    List<Entry> getAll();
}
