package lab3.beans;

import lab3.database.Repository;
import lab3.utils.ArrayUtils;
import lab3.utils.FacesUtils;
import lombok.Data;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import static javax.faces.application.FacesMessage.SEVERITY_ERROR;

@Data
public class HitsManager implements Serializable {
    private static final Integer[] X_VALUES = {-4, -3, -2, -1, 0, 1, 2, 3, 4};
    private static final float MAX_Y = 3;
    private static final float MIN_Y = -3;

    @Inject
    private Repository<Hit> hitRepository;
    private List<Hit> hitBeansList;

    // Manual input
    private boolean[] manualInputXs = new boolean[9];
    private Float y;

    // Canvas input
    private int canvasX;
    private Float canvasY;
    private Float canvasR = 1f;

    @PostConstruct
    private void init() {
        hitBeansList = hitRepository.getAll();
    }

    public void clear() {
        hitBeansList.clear();
        hitRepository.clear();
    }

    private boolean validateManualInputs() {
        if (!ArrayUtils.containsTrue(manualInputXs)) { // no Xs chosen
            FacesUtils.addFacesMessage(SEVERITY_ERROR, "Please select at least one X coordinate");
            return false;
        }
        return true;
    }

    private boolean validateCanvasX() {
        return Arrays.asList(X_VALUES).contains(canvasX);
    }

    private void addHit(int x, float y, float r) {
        Hit hit = new Hit(x, y, r);
        hitBeansList.add(hit);
        hitRepository.save(hit);
    }

    public void submitManualInputHit(float radius) {
        if (!validateManualInputs()) return;
        for (int xChecked = 0; xChecked < manualInputXs.length; xChecked++) {
            if (manualInputXs[xChecked]) {
                addHit(X_VALUES[xChecked], y, radius);
            }
        }
    }

    public void submitCanvasClickHit() {
        if (!validateCanvasX()) return;
        addHit(canvasX, canvasY, canvasR);
    }
}
